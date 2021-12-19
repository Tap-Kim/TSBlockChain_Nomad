import * as CryptoJS from 'crypto-js';

interface IBlock {
    index: number,
    hash?: string,
    previousHash?: string,
    data: string,
    timestamp: number
}

class Block {
    static calculateBlockHash = ({ index, previousHash, timestamp, data }: IBlock): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString()

    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor({ index, hash, previousHash, data, timestamp }: IBlock) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block({
    index: 0,
    hash: "Block chain First Hash Data {}",
    previousHash: "",
    data: "Hellow",
    timestamp: 1234565
});

let blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const objHash = { index: newIndex, previousHash: previousBlock.hash, timestamp: newTimestamp, data }

    const newBlock: Block = new Block({ ...objHash, hash: Block.calculateBlockHash(objHash), previousHash: previousBlock.hash });

    addBlock(newBlock);

    return newBlock;
};

const getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash({ ...aBlock });

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)
        || previousBlock.index + 1 !== candidateBlock.index
        || previousBlock.hash !== candidateBlock.previousHash
        || getHashforBlock(candidateBlock) !== candidateBlock.hash
    ) {
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log("** MAKE BLOCK CHAIN ***");
console.log(blockChain);
console.log("** ---------------- ***");
export { }