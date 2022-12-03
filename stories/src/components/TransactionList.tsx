import { Flex, Heading, List, ListIcon, ListItem } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'
import * as React from 'react'
import { TokenInfo, TokenStatus, useBlockchainContext } from './BlockchainContext'
import { AiFillFire } from 'react-icons/ai'
import { HiSparkles } from 'react-icons/hi'
import { FaHandshake } from 'react-icons/fa'
import { ZERO_ADDRESS } from '../constants'
import { Alert, AlertIcon } from '@chakra-ui/alert'
import { ContractWriteOptions } from './ContractWriteOptions'
import { Spacer } from '@chakra-ui/react'

export const TransactionList = () => {
    const { contractConnection, setTokenInfo } = useBlockchainContext()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<Error>()
    const [txns, setTxns] = React.useState<any[]>([])

    React.useEffect(() => {
        if (contractConnection) {
            setIsLoading(true)
            contractConnection
                .queryFilter(contractConnection.filters.Transfer())
                .then((result: any[]) => {
                    setTxns(
                        result.sort((a, b) => {
                            return a.blockNumber - b.blockNumber
                        })
                    )
                })
                .catch((e: Error) => setError(e))
                .finally(() => setIsLoading(false))
        }
    }, [contractConnection])

    // Process the transactions
    React.useEffect(() => {
        const handled = new Set<number>()
        const tokenInfo: Map<number, TokenInfo> = new Map()
        txns.slice()
            .reverse()
            .forEach((value) => {
                const tokenId = Number(value.args.tokenId)
                // If we've already seen the most recent transaction for this tokenId, skip
                if (handled.has(tokenId)) {
                    return
                }
                if (value.args.to === ZERO_ADDRESS) {
                    tokenInfo.set(tokenId, {
                        owner: ZERO_ADDRESS,
                        status: TokenStatus.Burned
                    })
                } else {
                    // If it was transferred or minted, store current owner
                    tokenInfo.set(tokenId, {
                        owner: value.args.to,
                        status: TokenStatus.Minted
                    })
                }
                handled.add(tokenId)
            })
        setTokenInfo(tokenInfo)
    }, [txns, setTokenInfo])

    const renderLoading = () => {
        return (
            <Flex width="100%" height="100%" alignItems="center" gap={5} padding={30}>
                <CircularProgress isIndeterminate color="teal.400"></CircularProgress>
                <div>Fetching relevant transactions</div>
            </Flex>
        )
    }

    return (
        <Flex width="100%" height="100%" direction="column">
            {isLoading && renderLoading()}
            {error && (
                <Alert status="error">
                    <AlertIcon />
                    Error fetching transactions: {error.message}
                </Alert>
            )}
            {!isLoading && txns.length > 0 && (
                <>
                    <Heading as="h5" size="md" textAlign="left">
                        Transactions
                    </Heading>
                    <List spacing={5} textAlign="left" padding="20px" overflow="scroll">
                        {txns.map((txn) => {
                            return (
                                <Transaction
                                    key={txn.blockNumber}
                                    from={txn.args.from}
                                    to={txn.args.to}
                                    tokenId={txn.args.tokenId}
                                    blockNumber={txn.blockNumber}
                                />
                            )
                        })}
                    </List>
                    <Spacer />
                </>
            )}
            <ContractWriteOptions />
        </Flex>
    )
}

enum EventType {
    Burn = 'BURN',
    Mint = 'MINT',
    Transfer = 'TRANSFER'
}

type TransactionProps = {
    from: string
    to: string
    blockNumber: string
    tokenId: string
}

const Transaction = ({ from, to, tokenId }: TransactionProps) => {
    let eventType = EventType.Transfer
    if (from === ZERO_ADDRESS) {
        eventType = EventType.Mint
    } else if (to === ZERO_ADDRESS) {
        eventType = EventType.Burn
    }

    const getIconFromEventType = () => {
        switch (eventType) {
            case EventType.Burn:
                return <ListIcon as={AiFillFire} color="red.500" />
            case EventType.Mint:
                return <ListIcon as={HiSparkles} color="yellow.500" />
            case EventType.Transfer:
                return <ListIcon as={FaHandshake} color="cyan.500" />
            default:
                return <ListIcon as={FaHandshake} />
        }
    }

    const getLabel = () => {
        const len = from.length
        const maxLen = 5
        const fromConcat = `0x...${from.substring(len - maxLen)}`
        const toConcat = `0x...${to.substring(len - maxLen)}`
        switch (eventType) {
            case EventType.Burn:
                return `Gem ${tokenId} burned by ${fromConcat}`
            case EventType.Mint:
                return `Gem ${tokenId} minted by ${toConcat}`
            case EventType.Transfer:
                return `Gem ${tokenId} transferred from ${fromConcat} to ${toConcat}`
            default:
                return `unrecognized transaction`
        }
    }

    return (
        <ListItem>
            {getIconFromEventType()}
            {getLabel()}
        </ListItem>
    )
}
