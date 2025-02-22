import * as React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Center, Flex, Spacer } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useBlockchainContext } from "./BlockchainContext";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverFooter,
  PopoverCloseButton,
} from "@chakra-ui/popover";
import { TutorialStep, useNavContext } from "./NavContext";

export const PoemSvg = () => {
  const { colorMode } = useColorMode();
  const { contractConnection, metamask } = useBlockchainContext();
  const { setTutorialState, tutorialState } = useNavContext();
  const [svgText, setSvgText] = React.useState("Fetching blockchain info...");

  // On contract connection, check for svg
  React.useEffect(() => {
    if (contractConnection) {
      contractConnection.getDefaultSvg().then((result: string) => {
        setSvgText(result);
      });
    } else {
      setSvgText(
        "Can't fetch Poem contract info. Do you have Metamask installed? " +
          "This site uses the Metamask to query the Ethereum blockchain without " +
          "using any of your personal data."
      );
    }
  }, [contractConnection]);

  const modifySvgStyle = (text: string): string => {
    const node = colorMode === "dark" ? "#a9a9a9" : "#999999";
    const nodeNotSelected = colorMode === "dark" ? "#555555" : "#aaaaaa";
    const nodeSelected = colorMode === "dark" ? "white" : "black";
    const nodeHidden = colorMode === "dark" ? "#333333" : "#cccccc";
    return text.replace(
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" style="background:#1a1a1a">',
      `<style>[class*="node"]{font-size:21px !important; overflow:hidden !important;}.node{color:${node} !important;} .nodeNotSelected{color:${nodeNotSelected} !important;} .nodeSelected{color:${nodeSelected} !important;} .nodeHidden{color:${nodeHidden} !important;}` +
        `.sentence{font-size:70px !important;color:${nodeSelected} !important;text-align:left;font-family:serif}</style>`
    );
  };

  if (metamask && !contractConnection) {
    return (
      <Center>
        Poem is currently only launched on the Ethereum mainnet and Goerli networks.
        Please use Metamask to switch networks.
      </Center>
    );
  }

  if (!contractConnection) {
    return <Center>{svgText}</Center>;
  }

  return (
    <Popover
      isOpen={tutorialState === TutorialStep.Image}
      placement="right-start"
    >
      <PopoverTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100%"
          width="100%"
          viewBox="0 0 800 800"
          dangerouslySetInnerHTML={{ __html: modifySvgStyle(svgText) }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton
          onClick={() => {
            setTutorialState(TutorialStep.None);
          }}
        />
        <PopoverHeader>The Poem</PopoverHeader>
        <PopoverBody fontSize="16px" padding="20px">
          The poem is stored on the blockchain both as text and as the image you
          see here, available in each token's metadata. With every transaction,
          the view changes: switching between the poem we've constructed so far
          and a birds' eye view of the diamond
        </PopoverBody>
        <PopoverFooter as={Flex}>
          <Spacer />
          <Button
            onClick={() => {
              setTutorialState(TutorialStep.TokenList);
            }}
          >
            next
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
