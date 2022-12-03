import * as React from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { BlockchainContext } from '../src/components/BlockchainContext'
import { PoemViewer } from '../src/components/PoemViewer'
import { Page } from '../src/Page'
import { NavContext, Pages, TutorialStep } from '../src/components/NavContext'
import { About } from '../src/components/About'
import { Home } from '../src/components/Home'
import theme from '../src/components/extendedTheme'

const pageToComponent: Record<Pages, JSX.Element> = {
    [Pages.CurrStatus]: <PoemViewer />,
    [Pages.About]: <About />,
    [Pages.Home]: <Home />
}

const Index = ({ children }) => {
    const [currPage, setCurrPage] = React.useState<Pages>(Pages.Home)
    const [tutorialState, setTutorialState] = React.useState<TutorialStep>(TutorialStep.None)

    const defaultNavContext = {
        currPage: currPage,
        setCurrPage: setCurrPage,
        tutorialState: tutorialState,
        setTutorialState: setTutorialState
    }

    return (
        <ChakraProvider theme={theme}>
            <Box textAlign="center" fontSize="xl">
                <NavContext.Provider value={defaultNavContext}>
                    <BlockchainContext
                        child={
                            <Page
                                body={
                                    currPage == Pages.About ? children : pageToComponent[currPage]
                                }
                            />
                        }></BlockchainContext>
                </NavContext.Provider>
            </Box>
        </ChakraProvider>
    )
}

export default Index
