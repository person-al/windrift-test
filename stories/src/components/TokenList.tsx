import {
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  Badge,
  Spacer,
} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { CircularProgress } from "@chakra-ui/progress";
import * as React from "react";
import { TokenStatus, useBlockchainContext } from "./BlockchainContext";
import { AiFillFire } from "react-icons/ai";
import { HiSparkles } from "react-icons/hi";
import { BsLockFill } from "react-icons/bs";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import Icon from "@chakra-ui/icon";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverFooter,
  PopoverHeader,
} from "@chakra-ui/popover";
import { useNavContext, TutorialStep, Pages } from "./NavContext";

export const TokenList = () => {
  const { contractConnection } = useBlockchainContext();
  const { setTutorialState, setCurrPage, tutorialState } = useNavContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error>();
  const [maxNumTokens, setMaxNumTokens] = React.useState<number>(0);

  React.useEffect(() => {
    if (contractConnection) {
      setIsLoading(true);
      contractConnection
        .MAX_NUM_NFTS()
        .then((result: number) => {
          setMaxNumTokens(result);
        })
        .catch((e: Error) => setError(e))
        .finally(() => setIsLoading(false));
    }
  }, [contractConnection]);

  const renderLoading = () => {
    return (
      <Flex width="100%" height="100%" alignItems="center" gap={5} padding={30}>
        <CircularProgress isIndeterminate color="yellow.400"></CircularProgress>
        <div>Getting token info</div>
      </Flex>
    );
  };

  const getTokens = () => {
    const tokens = [];
    let i = 0;
    for (; i < maxNumTokens; i++) {
      tokens.push(<Token key={i} tokenId={i} />);
    }
    return tokens;
  };

  return (
    <>
      {isLoading && renderLoading()}
      {error && (
        <Alert status="error">
          <AlertIcon />
          Error fetching transactions: {error.message}
        </Alert>
      )}
      {maxNumTokens > 0 && (
        <>
          <Heading as="h5" size="md" textAlign="left">
            Tokens
          </Heading>
          <Popover isOpen={tutorialState === TutorialStep.TokenList}>
            <PopoverTrigger>
              <SimpleGrid
                paddingTop="10px"
                minChildWidth="100px"
                spacing="40px"
              >
                {getTokens()}
              </SimpleGrid>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>The Tokens</PopoverHeader>
              <PopoverBody fontSize="16px" padding="20px">
                This row shows you all possible tokens and their current states:{" "}
                <Icon as={BsLockFill} color="gray.500" boxSize="15px" />
                mintable
                <Icon as={BsLockFill} color="gray.500" boxSize="15px" />,{" "}
                <Icon as={HiSparkles} color="yellow.500" boxSize="15px" />
                minted
                <Icon as={HiSparkles} color="yellow.500" boxSize="15px" />, and{" "}
                <Icon as={AiFillFire} color="red.500" boxSize="15px" />
                burned
                <Icon as={AiFillFire} color="red.500" boxSize="15px" />,
              </PopoverBody>
              <PopoverFooter as={Flex}>
                <Button
                  onClick={() => {
                    setTutorialState(TutorialStep.None);
                    setCurrPage(Pages.About);
                  }}
                >
                  learn more
                </Button>
                <Spacer />
                <Button
                  onClick={() => {
                    setTutorialState(TutorialStep.None);
                  }}
                >
                  done
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </>
      )}
    </>
  );
};

const Token = ({ tokenId }: { tokenId: number }) => {
  const { signer, tokenInfo } = useBlockchainContext();
  const [ownerLoggedIn, setOwnerLoggedIn] = React.useState<boolean>(false);
  const info = tokenInfo.get(tokenId);

  React.useEffect(() => {
    const info = tokenInfo.get(tokenId);
    if (info && info.owner && signer) {
      // Metamask is always lower case and the contract stores the checksum version
      // Let's just take a moment to agree that Ethereum's case insensitivity
      // is weird
      setOwnerLoggedIn(
        info.owner.toLocaleLowerCase() === signer.toLocaleLowerCase()
      );
    } else {
      setOwnerLoggedIn(false);
    }
  }, [signer, tokenId, tokenInfo]);

  const getIconFromEventType = () => {
    switch (info && info.status) {
      case TokenStatus.Burned:
        return <Icon as={AiFillFire} color="red.500" boxSize="60px" />;
      case TokenStatus.Minted:
        return <Icon as={HiSparkles} color="yellow.500" boxSize="60px" />;
      default:
        return <Icon as={BsLockFill} color="gray.500" boxSize="60px" />;
    }
  };

  const getLabel = () => {
    return <div>{tokenId}</div>;
  };

  return (
    <VStack>
      {getIconFromEventType()}
      {getLabel()}
      {ownerLoggedIn && <Badge colorScheme="yellow">Owned by you</Badge>}
    </VStack>
  );
};
