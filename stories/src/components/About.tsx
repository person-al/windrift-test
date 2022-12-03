import * as React from "react";
import {
  Box,
  Center,
  Heading,
  Link,
  Flex,
  Spacer,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { keyframes } from "@chakra-ui/react";
import { Pages, useNavContext } from "./NavContext";
import { Rules } from "./Rules";

export const About = () => {
  const { setCurrPage } = useNavContext();
  const { colorMode } = useColorMode();

  const isDarkMode = () => {
    return colorMode === "dark";
  };

  const selectedColor = () => {
    return isDarkMode() ? "white" : "black";
  };

  const unselectedColor = () => {
    return isDarkMode() ? "#555555" : "#aaaaaa";
  };

  const p1 = keyframes`
  0% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  25% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
  `;

  const p2 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
    25% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
    50% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
  `;

  const p3 = keyframes`
  0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
  50% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  75% {animation-timing-function: steps(1, end); color: ${unselectedColor()};} 
  `;

  const p4 = keyframes`
  0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
  75% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  100% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
   `;

  const p1234 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  `;

  const p23 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
    25% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
    75% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
  `;

  const p24 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
    25% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
    50% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
    75% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  `;

  const p13 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
    25% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
    50% {animation-timing-function: steps(1, end); color: ${selectedColor()};}   
    75% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}    
  `;

  const p34 = keyframes`
    0% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
    50% {animation-timing-function: steps(1, end); color: ${selectedColor()};}   
  `;

  const p14 = keyframes`
  0% {animation-timing-function: steps(1, end); color: ${selectedColor()};}
  25% {animation-timing-function: steps(1, end); color: ${unselectedColor()};}
  75% {animation-timing-function: steps(1, end); color: ${selectedColor()};}   
  `;

  const getAnimation = (animation: string) => {
    return `${animation} infinite 8s linear`;
  };

  const getSvgBox = () => {
    return (
      <Box
        minHeight="60%"
        minWidth="60%"
        sx={{
          ".node": {
            fontSize: "21px",
            fontFamily: "serif",
            height: "100%",
            color: unselectedColor(),
          },
          ".p1": {
            animation: getAnimation(p1),
          },
          ".p2": {
            animation: getAnimation(p2),
          },
          ".p3": {
            animation: getAnimation(p3),
          },
          ".p4": {
            animation: getAnimation(p4),
          },
          ".p13": {
            animation: getAnimation(p13),
          },
          ".p23": {
            animation: getAnimation(p23),
          },
          ".p24": {
            animation: getAnimation(p24),
          },
          ".p34": {
            animation: getAnimation(p34),
          },
          ".p14": {
            animation: getAnimation(p14),
          },
          ".p1234": {
            animation: getAnimation(p1234),
          },
        }}
      >
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
    );
  };

  return (
    <>
      <p>You may own or you may create.</p>
      <p>You cannot do both.</p>
      <br />
      <Center>
        <Box width="70%" textAlign="left">
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={6}
          >
            <GridItem rowSpan={1} colSpan={[2, 2, 1, 1]}>
              {getSvgBox()}
            </GridItem>
            <GridItem rowSpan={1} colSpan={[2, 2, 1, 1]}>
              <Flex direction="column" height="100%">
                <Spacer />
                <Text height="fit-content" paddingBottom="20px">
                  Poem Pathfinder is a diamond-shaped poem which, in itself,
                  contains 21600 potential poems. Each of the 7 mintable NFTs
                  represent a choice: left or right?
                </Text>
                <Text height="fit-content" paddingBottom="20px">
                  As tokens are transferred and held, the path before them
                  changes. The more owners a token has, the more likely it is to
                  stray off the strict left-right path. And the longer a token
                  is held, the more the future hides from view.
                </Text>
                <Spacer />
              </Flex>
            </GridItem>
          </Grid>

          <Text>
            To take the next step, a token must be burned. Then, the chosen
            phrase will reveal itself to all. Mint, hold, transfer, sell, or
            burn, it's up to you!
          </Text>
          <br />
          <Text paddingBottom="20px">Let's create together.</Text>
          <Center>
            <Button
              colorScheme="yellow"
              onClick={() => setCurrPage(Pages.CurrStatus)}
            >
              see the poem
            </Button>
          </Center>
          <br />
          <br />
          <Rules headingSize="lg" />
          <br />
          <Heading size="lg">The Art</Heading>
          <Text>
            Pathfinder reminds us that ownership in the virtual world is shaped
            by creators. With physical goods, your rights are governed by
            physics: Barnes and Noble can't stop you from lending a book to a
            friend. But virtual goods are different. Amazon{" "}
            <Link
              color="cyan.500"
              href="https://www.pcworld.com/article/524327/kindle_e_book.html"
            >
              <i>can</i> remove an ebook from your Kindle
            </Link>{" "}
            on a whim.
          </Text>
          <br />
          <Text>
            While blockchains <i>can</i> publicize the rules of ownership, the
            flexibility of the virtual world remains. Business can{" "}
            <Link
              color="cyan.500"
              href="https://news.coincu.com/116774-axie-infinity-removes-slp-on-classic-mode/"
            >
              change the rules
            </Link>
            , or artists can use it{" "}
            <Link
              color="cyan.500"
              href="https://cointelegraph.com/news/opensea-collector-pulls-the-rug-on-nfts-to-highlight-arbitrary-value"
            >
              make a statement
            </Link>
            . Pathfinder explores the boundaries of what ownership can mean. You
            can own a token, which gives you control over the piece itself, but
            you can only <i>exhert</i> that control by burning your token. You
            may own or you may create. You cannot do both.
          </Text>
          <br />
          <Text paddingBottom="40px">
            Enjoy! And please let me know what you think.
          </Text>
        </Box>
      </Center>
    </>
  );
};
