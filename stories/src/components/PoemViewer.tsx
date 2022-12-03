import * as React from "react";
import { Grid, GridItem } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/color-mode";
import { PoemSvg } from "./PoemSvg";
import { TransactionList } from "./TransactionList";
import { TokenList } from "./TokenList";
import { useBlockchainContext } from "./BlockchainContext";

export const PoemViewer = () => {
  const { colorMode } = useColorMode();
  const { latestBlockNum } = useBlockchainContext();
  const bgk = colorMode === "dark" ? "whiteAlpha.50" : "blackAlpha.50";
  return (
    <Grid
      p={3}
      maxHeight={[null, null, "92vh", "92vh"]}
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(8, 1fr)"
      gap={4}
    >
      <GridItem
        rowSpan={[1, 2, 3, 3]}
        colSpan={[8, 8, 5, 5]}
        alignItems="center"
      >
        <PoemSvg key={`svg-${latestBlockNum}`} />
      </GridItem>
      <GridItem
        padding="20px"
        rowSpan={[1, 2, 3, 3]}
        colSpan={[8, 8, 3, 3]}
        bg={bgk}
      >
        <TransactionList key={`txnList-${latestBlockNum}`} />
      </GridItem>
      <GridItem padding="20px" rowSpan={1} colSpan={8} bg={bgk}>
        <TokenList key={`tokenList-${latestBlockNum}`} />
      </GridItem>
    </Grid>
  );
};
