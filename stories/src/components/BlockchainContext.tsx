import * as React from 'react'
import { ethers } from 'ethers'
import { CONTRACT_NAME, SUPPORTED_CHAINS, CONTRACT_INFO } from '../constants'

export enum TokenStatus {
    Burned = 'BURN',
    Minted = 'MINT',
    Waiting = 'WAIT'
}

export type TokenInfo = {
    owner: string
    status: TokenStatus
}

type BlockchainContextType = {
    metamask: any
    contractConnection: any
    getWriteConnection: () => any
    clearWriteConnection: () => void
    signer: string | undefined
    chainId: string
    latestBlockNum: number
    loadSigner: () => void
    changeChainManually: (chainId: string) => void
    tokenInfo: Map<number, TokenInfo>
    setTokenInfo: (info: Map<number, TokenInfo>) => void
    isOwner: boolean
}

const defaultContext: BlockchainContextType = {
    metamask: undefined,
    contractConnection: undefined,
    getWriteConnection: () => {},
    clearWriteConnection: () => {},
    signer: undefined,
    chainId: '0x0',
    latestBlockNum: 0,
    loadSigner: () => {},
    changeChainManually: (_: string) => {},
    tokenInfo: new Map(),
    setTokenInfo: (_: Map<number, TokenInfo>) => {},
    isOwner: false
} //Insert the default value here.
const InternalBlockchainContext = React.createContext(defaultContext)

export const useBlockchainContext = (): BlockchainContextType => {
    return React.useContext(InternalBlockchainContext)
}

/**
 * BlockchainContext connects to our Contract and to Metamask for signing
 */
export const BlockchainContext = ({ child }: { child: JSX.Element }) => {
    const metamask = window && (window as any).ethereum
    const [contractConnection, setContractConnection] = React.useState<ethers.Contract>()
    const [writeConnection, setWriteConnection] = React.useState<ethers.Contract>()
    const [signer, setSigner] = React.useState<string>()
    const [chainId, setChainId] = React.useState<string>('0x0')
    const [latestBlock, setLatestBlock] = React.useState<number>(0)
    const [tokenInfo, setTokenInfo] = React.useState<Map<number, TokenInfo>>(new Map())
    const [isOwner, setIsOwner] = React.useState<boolean>(false)

    metamask && metamask.on('chainChanged', handleChainChanged)

    metamask &&
        metamask.on('accountsChanged', function (accounts: string[]) {
            // If the user changed their account, consider them logged out
            if (accounts[0] !== signer && (signer || writeConnection)) {
                clearWriteConnection()
            }
        })

    function handleChainChanged(_chainId: string) {
        // Metamask recommends reloading the page, unless you must do otherwise
        window && window.location.reload()
    }

    function changeChainManually(_chainId: string) {
        setChainId(_chainId)
        clearWriteConnection()
        setUpReadConnection()
        setTokenInfo(new Map()) // all our token info is for the old chain, let's clear it
    }

    const createWriteConnection = async () => {
        if (!metamask || !SUPPORTED_CHAINS.includes(chainId)) {
            return
        }

        try {
            const contractInfo = CONTRACT_INFO[chainId]
            const provider = new ethers.providers.Web3Provider(metamask)
            const signerObj = provider.getSigner()
            const connection = new ethers.Contract(contractInfo.address, contractInfo.abi, signerObj)
            setWriteConnection(connection)
            signerObj.getAddress().then((addr) => addr !== signer && setSigner(addr))
            return connection
        } catch (err) {
            console.log(err)
        }
    }

    const getWriteConnection = async (): Promise<ethers.Contract | undefined> => {
        return writeConnection || (await createWriteConnection())
    }

    const loadSigner = async () => {
        const accounts = await metamask.request({
            method: 'eth_requestAccounts'
        })
        if (accounts.length > 0) {
            const s = accounts[0]
            setSigner(s)
        }
    }

    const clearWriteConnection = () => {
        setWriteConnection(undefined)
        setSigner(undefined)
    }

    const setUpReadConnection = () => {
        // If the chain is supported and our current contractConnection either
        // doesn't exist or isn't connected to the right chain. Create a new connection
        if (
            SUPPORTED_CHAINS.includes(chainId) &&
            (!contractConnection ||
                (contractConnection.provider as any).network.chainId !== Number(chainId))
        ) {
            const contractInfo = CONTRACT_INFO[chainId]
            let provider
            if (metamask) {
                provider = new ethers.providers.Web3Provider(metamask)
            } else {
                provider = ethers.getDefaultProvider(Number(chainId), {
                    etherscan: process.env.REACT_APP_ETHERSCAN_API_KEY,
                    infura: '-',
                    alchemy: process.env.REACT_APP_ALCHEMY_API_KEY,
                    pocket: '-',
                    ankr: '-'
                })
                provider = new ethers.providers.AlchemyProvider(
                    Number(chainId),
                    process.env.REACT_APP_ALCHEMY_API_KEY
                )
            }
            const connection = new ethers.Contract(contractInfo.address, contractInfo.abi, provider)
            connection.name().then((result: string) => {
                if (result === CONTRACT_NAME) {
                    setContractConnection(connection)
                }
            })
        }
    }

    const contextInfo: BlockchainContextType = {
        metamask: metamask,
        chainId: chainId,
        signer: signer,
        contractConnection: contractConnection,
        getWriteConnection: getWriteConnection,
        clearWriteConnection: clearWriteConnection,
        latestBlockNum: latestBlock,
        loadSigner: loadSigner,
        changeChainManually: changeChainManually,
        tokenInfo: tokenInfo,
        setTokenInfo: setTokenInfo,
        isOwner: isOwner
    }

    // On first load, figure out which chain we're connected to
    React.useEffect(() => {
        async function updateConnectedChain() {
            const connectedChainId = await metamask.request({
                method: 'eth_chainId'
            })
            setChainId(connectedChainId)
        }
        if (metamask) {
            updateConnectedChain()
        } else {
            setChainId('0x5') //Default to Goerli
        }
    }, [])

    // Once we know the chain we're on, try to set up a contract connection
    // if we don't have one already
    React.useEffect(() => {
        setUpReadConnection()
    }, [chainId])

    // If we have a contractConnection, set up a listener on it
    React.useEffect(() => {
        if (contractConnection) {
            contractConnection.on('Transfer', (_to, _from, _tokenId, event: any) => {
                setLatestBlock(event.blockNumber)
            })
            // Check if owns any tokens
            signer &&
                contractConnection.balanceOf(signer).then((result: number) => {
                    setIsOwner(result > 0)
                })
        }
    }, [contractConnection])

    return (
        <InternalBlockchainContext.Provider value={contextInfo}>
            {child}
        </InternalBlockchainContext.Provider>
    )
}
