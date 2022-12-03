import * as React from 'react'
import { Button, IconButton } from '@chakra-ui/button'
import { useBlockchainContext } from './BlockchainContext'
import { BurnModal } from './BurnModal'
import { CHAIN_ID_TO_NAME, CONTRACT_INFO } from '../constants'
import { BsInfoCircle } from 'react-icons/bs'
import Icon from '@chakra-ui/icon'
import { Spacer, Flex } from '@chakra-ui/layout'
import {
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverTrigger,
    PopoverHeader
} from '@chakra-ui/popover'
import { Rules } from './Rules'
import { useNavContext, TutorialStep, Pages } from './NavContext'
import { useDisclosure } from '@chakra-ui/react-use-disclosure'

export const ContractWriteOptions = () => {
    const { contractConnection, chainId } = useBlockchainContext()
    const { setTutorialState, setCurrPage } = useNavContext()
    const { onOpen, onClose } = useDisclosure()

    const onTutorialOpen = () => {
        setTutorialState(TutorialStep.Rules)
        onOpen()
    }

    return (
        <Flex flexWrap="wrap" paddingTop="10px" gap={5}>
            <Popover
                returnFocusOnClose={false}
                onOpen={onTutorialOpen}
                onClose={onClose}
                placement="left-end">
                <PopoverTrigger>
                    <IconButton
                        variant="ghost"
                        aria-label="the rules"
                        fontSize="20px"
                        icon={<Icon as={BsInfoCircle} />}
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Rules</PopoverHeader>
                    <PopoverBody fontSize="16px" padding="20px">
                        <Rules />
                    </PopoverBody>
                    <PopoverFooter as={Flex}>
                        <Spacer />
                        <Button
                            onClick={() => {
                                setTutorialState(TutorialStep.Image)
                            }}>
                            next
                        </Button>
                    </PopoverFooter>
                </PopoverContent>
            </Popover>
            <Button key="nav" colorScheme="yellow" onClick={() => setCurrPage(Pages.About)}>
                Find
            </Button>
            <BurnModal />
            <Button
                onClick={() =>
                    window.open(
                        `https://${CHAIN_ID_TO_NAME[chainId].toLowerCase()}.etherscan.io/address/${
                            CONTRACT_INFO[chainId].address
                        }#readContract`
                    )
                }
                disabled={!contractConnection}>
                Etherscan
            </Button>
            {CONTRACT_INFO[chainId] && CONTRACT_INFO[chainId].openSeaLink && (
                <Button onClick={() => window.open(CONTRACT_INFO[chainId].openSeaLink)}>
                    OpenSea
                </Button>
            )}
        </Flex>
    )
}
