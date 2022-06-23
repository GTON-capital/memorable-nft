const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const ropstenAddress = "0x09B68445437a3b9100440491aEA0dd6D479D3f46";
const deployAddress = ropstenAddress;
const whiteList = require("../whitelist.json");

const whiteListArray = whiteList.map((i) => i.address);

const leafNodes = whiteListArray.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const rootHash = merkleTree.getRoot();

const hexProof = merkleTree.getHexProof(leafNodes[1]);

console.log("Merkle tree: \n", merkleTree.toString());
console.log(rootHash.toString("hex"));
console.log(hexProof);

async function main() {
  const mpContract = await hre.ethers.getContractFactory("WhitelistStatus");
  const signer = await hre.ethers.getSigner();
  const contractAddress = deployAddress;
  const contract = mpContract.attach(contractAddress);

  // Set root

  let setRoot = await contract.setMerkleRoot(rootHash);

  // Check proofStatus
  let merkleProofContract = await contract.whitelistMint(hexProof);
  merkleProofContract.wait();
  console.log("Status of setRoot: ", setRoot.hash);
  console.log("Status of merkleProof: ", merkleProofContract.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
