import * as React from 'react'
import { useBlockchainContext } from './BlockchainContext'
import { ethers } from 'ethers'
import { ContractWriteModal } from './ContractWriteModal'

export const MintModal = ({
    onSuccess,
    onError
}: {
    onSuccess?: () => void
    onError?: (message: string) => void
}) => {
    const { contractConnection } = useBlockchainContext()

    const [mintFeeEth, setMintFeeEth] = React.useState<string>('')

    React.useEffect(() => {
        contractConnection &&
            contractConnection.mintFee().then((result: number) => {
                const fee = result / 10 ** 17
                setMintFeeEth(fee.toString())
            })
    }, [contractConnection])

    const getBody = () => {
        return (
            <span>
                This gem costs {mintFeeEth} ETH. You may only buy one gem from The Shopkeeper
                directly, and you may only hold 3 gems at a time. Ready? Note that this action
                requires Metamask.
            </span>
        )
    }

    const mintToken = (writeConn: ethers.Contract) => {
        return writeConn.mint({
            value: ethers.utils.parseEther(mintFeeEth)
        })
    }

    return (
        <ContractWriteModal
            triggerButtonText="Buy"
            triggerButtonColorScheme="yellow"
            header="Buy a gem"
            confirmButtonText="Buy"
            inProgressMessage="completing transaction, please wait until the transaction is confirmed..."
            successMessage="Gem purchased!"
            modalBody={getBody()}
            callContract={mintToken}
            onSuccess={onSuccess}
            onError={onError}
        />
    )
}
