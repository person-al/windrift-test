import * as React from 'react'
import {
    Box,
    Center,
    Grid,
    GridItem,
    Text,
    Flex,
    Spacer,
    LinkOverlay,
    LinkBox
} from '@chakra-ui/layout'
import { useColorMode } from '@chakra-ui/color-mode'
import { keyframes, Card, Image } from '@chakra-ui/react'
import { Pages, useNavContext } from './NavContext'

export const Home = () => {
    const { setCurrPage } = useNavContext()
    const { colorMode } = useColorMode()

    const isDarkMode = () => {
        return colorMode === 'dark'
    }

    const selectedColor = () => {
        return isDarkMode() ? 'white' : 'black'
    }

    const unselectedColor = () => {
        return isDarkMode() ? '#555555' : '#aaaaaa'
    }

    const p1 = keyframes`
  0% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  25% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
  `

    const p2 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
    25% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
    50% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
  `

    const p3 = keyframes`
  0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
  50% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  75% {animation-timing-function: steps(1, end); color: ${unselectedColor()};} 
  `

    const p4 = keyframes`
  0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
  75% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  100% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
   `

    const p1234 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  `

    const p23 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
    25% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
    75% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
  `

    const p24 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
    25% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
    50% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
    75% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  `

    const p13 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
    25% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
    50% {animation-timing-function: steps(1, end); color: ${selectedColor()};}   
    75% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
  `

    const p34 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
    50% {animation-timing-function: steps(1, end); color: ${selectedColor()};}   
  `

    const p14 = keyframes`
  0% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  25% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
  75% {animation-timing-function: steps(1, end); color: ${selectedColor()};}   
  `

    const getAnimation = (animation: string) => {
        return `${animation} infinite 15s linear`
    }

    const getSvgBox = () => {
        return (
            <Box
                minHeight="100%"
                minWidth="100%"
                paddingRight="30px"
                sx={{
                    '.node': {
                        fontSize: '21px',
                        fontFamily: 'serif',
                        height: '100%',
                        color: unselectedColor()
                    },
                    '.p1': {
                        animation: getAnimation(p1)
                    },
                    '.p2': {
                        animation: getAnimation(p2)
                    },
                    '.p3': {
                        animation: getAnimation(p3)
                    },
                    '.p4': {
                        animation: getAnimation(p4)
                    },
                    '.p13': {
                        animation: getAnimation(p13)
                    },
                    '.p23': {
                        animation: getAnimation(p23)
                    },
                    '.p24': {
                        animation: getAnimation(p24)
                    },
                    '.p34': {
                        animation: getAnimation(p34)
                    },
                    '.p14': {
                        animation: getAnimation(p14)
                    },
                    '.p1234': {
                        animation: getAnimation(p1234)
                    }
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
                    <foreignObject x="360" y="75" width="130" height="60">
                        <div className="node p1234">As he</div>
                    </foreignObject>
                    <foreignObject x="280" y="150" width="130" height="60">
                        <div className="node p24">reached</div>
                    </foreignObject>
                    <foreignObject x="440" y="150" width="130" height="60">
                        <div className="node p13">dropped</div>
                    </foreignObject>
                    <foreignObject x="200" y="225" width="130" height="60">
                        <div className="node p2">upwards</div>
                    </foreignObject>
                    <foreignObject x="360" y="225" width="130" height="60">
                        <div className="node p34">his hands</div>
                    </foreignObject>
                    <foreignObject x="520" y="225" width="130" height="60">
                        <div className="node p1">his eyes</div>
                    </foreignObject>
                    <foreignObject x="120" y="300" width="130" height="60">
                        <div className="node p2">joyously,</div>
                    </foreignObject>
                    <foreignObject x="280" y="300" width="130" height="60">
                        <div className="node p4">to the clouds,</div>
                    </foreignObject>
                    <foreignObject x="440" y="300" width="130" height="60">
                        <div className="node p3">shyly,</div>
                    </foreignObject>
                    <foreignObject x="600" y="300" width="130" height="60">
                        <div className="node p1">towards his shoes,</div>
                    </foreignObject>
                    <foreignObject x="40" y="375" width="130" height="60">
                        <div className="node">the sun</div>
                    </foreignObject>
                    <foreignObject x="200" y="375" width="130" height="60">
                        <div className="node p2">the wind</div>
                    </foreignObject>
                    <foreignObject x="360" y="375" width="130" height="60">
                        <div className="node p34">the footsteps</div>
                    </foreignObject>
                    <foreignObject x="520" y="375" width="130" height="60">
                        <div className="node p1">thunderous laughter</div>
                    </foreignObject>
                    <foreignObject x="680" y="375" width="130" height="60">
                        <div className="node">twinkling feathers</div>
                    </foreignObject>
                    <foreignObject x="120" y="450" width="130" height="60">
                        <div className="node">boistered</div>
                    </foreignObject>
                    <foreignObject x="280" y="450" width="130" height="60">
                        <div className="node p23">assuaged</div>
                    </foreignObject>
                    <foreignObject x="440" y="450" width="130" height="60">
                        <div className="node p14">echoed in</div>
                    </foreignObject>
                    <foreignObject x="600" y="450" width="130" height="60">
                        <div className="node">brushed</div>
                    </foreignObject>
                    <foreignObject x="200" y="525" width="130" height="60">
                        <div className="node p3">his excitement.</div>
                    </foreignObject>
                    <foreignObject x="360" y="525" width="130" height="60">
                        <div className="node p24">his fears.</div>
                    </foreignObject>
                    <foreignObject x="520" y="525" width="130" height="60">
                        <div className="node p1">his ears.</div>
                    </foreignObject>
                    <foreignObject x="280" y="600" width="130" height="60">
                        <div className="node p23">His struggle</div>
                    </foreignObject>
                    <foreignObject x="440" y="600" width="130" height="60">
                        <div className="node p14">His adventure</div>
                    </foreignObject>
                    <foreignObject x="360" y="675" width="130" height="60">
                        <div className="node p1234">was just beginning.</div>
                    </foreignObject>
                </svg>
            </Box>
        )
    }

    // <Image
    //     src="/images/house_transparent.png"
    //     boxSize="100%"
    //     objectFit="cover"
    //     opacity={isDarkMode() ? '0.65' : '1'}
    // />
    return (
        <Flex direction="column" height="90vh">
            <Center>
                <Box width="70%">
                    <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(2, 1fr)" gap={6}>
                        <GridItem rowSpan={1} colSpan={[2, 2, 1, 1]}>
                            <LinkBox as={Card} style={{ aspectRatio: '1' }}>
                                <Center width="100%" height="100%">
                                    <LinkOverlay
                                        href="#"
                                        width="80%"
                                        height="80%"
                                        onClick={() => {
                                            setCurrPage(Pages.About)
                                        }}>
                                        <Image
                                            src="/images/door.svg"
                                            boxSize="100%"
                                            objectFit="contain"
                                        />
                                        <Text>
                                            <i>find</i>
                                        </Text>
                                    </LinkOverlay>
                                </Center>
                            </LinkBox>
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={[2, 2, 1, 1]}>
                            <LinkBox as={Card} style={{ aspectRatio: '1' }}>
                                <LinkOverlay
                                    href="#"
                                    onClick={() => {
                                        setCurrPage(Pages.CurrStatus)
                                    }}>
                                    <Flex direction="column">{getSvgBox()}</Flex>
                                    <Text>
                                        <i>see</i>
                                    </Text>
                                </LinkOverlay>
                            </LinkBox>
                        </GridItem>
                    </Grid>
                </Box>
            </Center>
            <Spacer />
            <Text fontSize="sm">You may own or you may create. You cannot do both.</Text>
        </Flex>
    )
}
