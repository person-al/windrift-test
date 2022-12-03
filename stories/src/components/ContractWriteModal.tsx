import * as React from 'react'
import {
    ModalOverlay,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader
} from '@chakra-ui/modal'
import { Button } from '@chakra-ui/button'
import { Link, Flex } from '@chakra-ui/layout'
import { useDisclosure } from '@chakra-ui/react-use-disclosure'
import { CircularProgress } from '@chakra-ui/progress'
import { useBlockchainContext } from './BlockchainContext'
import { ethers } from 'ethers'

export const ContractWriteModal = ({
    triggerButtonText,
    triggerButtonColorScheme,
    header,
    confirmButtonText,
    inProgressMessage,
    successMessage,
    modalBody,
    callContract,
    onSuccess,
    onError
}: {
    triggerButtonText: string
    triggerButtonColorScheme: string
    header: string
    confirmButtonText: string
    inProgressMessage: string
    successMessage: string
    modalBody: JSX.Element
    callContract: (_: ethers.Contract) => ethers.ContractTransaction
    onSuccess?: () => void
    onError?: (message: string) => void
}) => {
    const { contractConnection, getWriteConnection, metamask } = useBlockchainContext()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [inProgress, setInProgress] = React.useState(false)
    const [txnHash, setTxnHash] = React.useState<string>()
    const [error, setError] = React.useState<string>()

    const onConfirm = async () => {
        if (!metamask) {
            setError('This action requires Metamask.')
            return
        }
        const writeConn: ethers.Contract | undefined = await getWriteConnection()
        if (!writeConn) {
            setError('Could not get a write connection to the contract on this network')
            return
        }
        setInProgress(true)
        setError(undefined)
        try {
            const txn = await callContract(writeConn)
            await txn.wait()
            setTxnHash(txn.hash)
            setInProgress(false)
            onSuccess()
        } catch (err: any) {
            console.log(err)
            const reasons = err.message.match(/reason":"(.+)","code/)
            if (reasons && reasons.length > 1) {
                setError(reasons[1])
                onError && onError(reasons[1])
            } else {
                setError(err.reason)
                onError && onError(err.reason)
            }
            setInProgress(false)
        }
    }

    const close = () => {
        setError(undefined)
        setInProgress(false)
        onClose()
    }

    return (
        <>
            <Button
                colorScheme={triggerButtonColorScheme}
                onClick={onOpen}
                disabled={!contractConnection}>
                {triggerButtonText}
            </Button>

            <Modal isOpen={isOpen} onClose={close}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{header}</ModalHeader>
                    <ModalCloseButton />
                    {!inProgress && !txnHash && !error && <ModalBody>{modalBody}</ModalBody>}
                    {error && (
                        <ModalBody>Error: {error} Check the dev console for details.</ModalBody>
                    )}
                    {!error && txnHash && (
                        <ModalBody>
                            {successMessage} You can see the transaction{' '}
                            <Link
                                color="cyan.500"
                                href={`https://rinkeby.etherscan.io/tx/${txnHash}`}>
                                here
                            </Link>
                            .
                        </ModalBody>
                    )}
                    {inProgress && (
                        <ModalBody>
                            <Flex
                                width="100%"
                                height="100%"
                                alignItems="center"
                                gap={5}
                                padding={30}>
                                <CircularProgress
                                    isIndeterminate
                                    color="yellow.400"></CircularProgress>
                                <div>{inProgressMessage}</div>
                            </Flex>
                        </ModalBody>
                    )}

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onConfirm}>
                            {confirmButtonText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
