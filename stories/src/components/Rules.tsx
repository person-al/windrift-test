import * as React from "react";
import { Heading, ListItem, UnorderedList } from "@chakra-ui/layout";

export const Rules = ({ headingSize }: { headingSize?: string }) => (
  <>
    {headingSize && <Heading size={headingSize}>Rules</Heading>}
    <UnorderedList textAlign="left">
      <ListItem>there are 7 total NFTs available</ListItem>
      <ListItem>you may mint a maximum of one token</ListItem>
      <ListItem>you may hold up to 3 tokens at a time</ListItem>
      <ListItem>
        minting, transferring, and holding all impact the path we take down the
        diamond
      </ListItem>
      <ListItem>burning a token is the only way to take our next step</ListItem>
    </UnorderedList>
  </>
);
