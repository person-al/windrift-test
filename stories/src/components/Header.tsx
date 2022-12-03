import * as React from 'react'
import { Tag, TagLeftIcon, TagLabel } from '@chakra-ui/tag'
import { Flex, HStack, VStack, Spacer, Heading } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/menu'
import { Tooltip } from '@chakra-ui/tooltip'
import { Button } from '@chakra-ui/button'
import { createIcon } from '@chakra-ui/icon'
import theme from './extendedTheme'

import { useBlockchainContext } from './BlockchainContext'
import { CHAIN_ID_TO_NAME, SUPPORTED_CHAINS } from '../constants'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Pages, useNavContext } from './NavContext'
import ResetButton from 'core/components/ui/reset-button'

/**
 * Header displays: the chain we're on, status on current connection to Metamask
 */
export const Header = () => {
    const { metamask, chainId, loadSigner, signer, clearWriteConnection, changeChainManually } =
        useBlockchainContext()
    const { currPage, setCurrPage } = useNavContext()

    const getStatusIndicator = (): any => {
        let fillColor = theme.colors.yellow[400]
        if (chainId !== '0x0') {
            fillColor = theme.colors.green[500]
        }
        return createIcon({
            displayName: 'Status',
            viewBox: '0 0 200 200',
            // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
            path: (
                <path
                    fill={fillColor}
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                />
            )
        })
    }

    const getTooltipLabel = () => {
        if (chainId === '0x0') {
            return 'Do you have Metamask installed? This webside currently uses Metamask to connect to the blockchain.'
        } else {
            return 'You can change networks using the Metamask extension. Support for non-Metamask users is in progress.'
        }
    }

    const getChainTag = () => {
        return (
            <Tag size="lg" variant="subtle" colorScheme="cyan">
                <TagLeftIcon boxSize="12px" as={getStatusIndicator()} />
                <TagLabel>
                    {CHAIN_ID_TO_NAME[chainId]}
                    {signer && ` as 0x...${signer.substring(signer.length - 4, signer.length)}`}
                </TagLabel>
            </Tag>
        )
    }

    const getChainSwitcher = () => {
        const menuItems = SUPPORTED_CHAINS.map((value: string) => {
            return (
                <MenuItem key={value} onClick={() => changeChainManually(value)}>
                    {CHAIN_ID_TO_NAME[value]}
                </MenuItem>
            )
        })
        return (
            <Menu>
                <MenuButton>{getChainTag()}</MenuButton>
                <MenuList>{menuItems}</MenuList>
            </Menu>
        )
    }

    const changePage = () => {
        setCurrPage(Pages.Home)
    }

    const getButtons = () => {
        const buttons = []
        if (currPage === Pages.About) {
            buttons.push(<ResetButton key="reset" />)
        }
        if (currPage !== Pages.Home) {
            buttons.push(
                <Button key="nav" variant="outline" colorScheme="yellow" onClick={changePage}>
                    Home
                </Button>
            )
        }
        return buttons
    }

    return (
        <Flex minWidth="100%" maxHeight="max-content" alignItems="center" gap="2" padding="20px">
            <Heading as="h1" size="lg">
                P O E M
            </Heading>
            <Spacer />
            <HStack>
                {getButtons()}
                {!signer && (
                    <Tooltip
                        label="Please install Metamask to connect your wallet."
                        shouldWrapChildren
                        isDisabled={metamask}>
                        <Button onClick={loadSigner} disabled={!metamask}>
                            Connect Wallet
                        </Button>
                    </Tooltip>
                )}
                {signer && <Button onClick={clearWriteConnection}>Disconnect Wallet</Button>}
                {metamask && <Tooltip label={getTooltipLabel()}>{getChainTag()}</Tooltip>}
                {!metamask && getChainSwitcher()}
                <ColorModeSwitcher />
            </HStack>
        </Flex>
    )
}
