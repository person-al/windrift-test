import testContract from "./contracts/PoemGoerliUpdated.json";

export const PARAGRAPH_SPACING = 5;

type ContractInfoType = {
    address: string;
    abi: any;
    openSeaLink?: string;
}

export const CHAIN_ID_TO_NAME: Record<string, string> = {
    "0x0": "Not connected",
    "0x1": "Ethereum",
    "0x3": "Ropsten",
    "0x4": "Rinkeby",
    "0x5": "Goerli",
    "0x2a": "Kovan"
};

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const CONTRACT_NAME = "PoemPathfinder";

// export const CONTRACT_INFO: Record<string,ContractInfoType> = {
//     "0x4": {address: "0xDeE90CcC0ebD4b1cf3373621946b8fee22660f47", abi: testContract.abi, openSeaLink: "https://testnets.opensea.io/collection/poempathfinder"},
//     "0x5": {address: "0x9b92C19698D61E6f8899CAD25390857FAD6eA5Cc", abi: testContract.abi},
// }

export const CONTRACT_INFO: Record<string,ContractInfoType> = {
    "0x5": {address: "0x624910E773E52495165f05a5276111Ab8fD837a3", abi: testContract.abi, openSeaLink: "https://testnets.opensea.io/collection/poempathfinder-v4"},
}

export const SUPPORTED_CHAINS = Object.keys(CONTRACT_INFO);