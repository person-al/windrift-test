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

export const CONTRACT_NAME = "Pathfinder";

// export const CONTRACT_INFO: Record<string,ContractInfoType> = {
//     "0x4": {address: "0xDeE90CcC0ebD4b1cf3373621946b8fee22660f47", abi: testContract.abi, openSeaLink: "https://testnets.opensea.io/collection/poempathfinder"},
//     "0x5": {address: "0x9b92C19698D61E6f8899CAD25390857FAD6eA5Cc", abi: testContract.abi},
// }
// 0x7AEe7318aEac4C955f554b5cF6A3C42b96F1143f
// 0x7E682a7427f0E62De84a4e7e2c14566C0e0aE96c

export const CONTRACT_INFO: Record<string,ContractInfoType> = {
    "0x5": {address: "0x7E682a7427f0E62De84a4e7e2c14566C0e0aE96c", abi: testContract.abi, openSeaLink: "https://testnets.opensea.io/collection/pathfinder"},
}

export const SUPPORTED_CHAINS = Object.keys(CONTRACT_INFO);