"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor({ index, hash, previousHash, data, timestamp }) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = ({ index, previousHash, timestamp, data }) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new Block({
    index: 0,
    hash: "Block chain First Hash Data {}",
    previousHash: "",
    data: "Hellow",
    timestamp: 1234565
});
let blockChain = [genesisBlock];
const getBlockChain = () => blockChain;
const getLatestBlock = () => blockChain[blockChain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const objHash = { index: newIndex, previousHash: previousBlock.hash, timestamp: newTimestamp, data };
    const newBlock = new Block(Object.assign(Object.assign({}, objHash), { hash: Block.calculateBlockHash(objHash), previousHash: previousBlock.hash }));
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(Object.assign({}, aBlock));
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)
        || previousBlock.index + 1 !== candidateBlock.index
        || previousBlock.hash !== candidateBlock.previousHash
        || getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log("** MAKE BLOCK CHAIN ***");
console.log(blockChain);
console.log("** ---------------- ***");
//# sourceMappingURL=index.js.map