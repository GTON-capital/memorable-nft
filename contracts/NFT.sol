// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import { InitializableOwnable } from "./InitializableOwnable.sol";
import { ERC721A } from "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract GTONMemorableNFT is ERC721A, InitializableOwnable {

  bytes32 public merkleRoot;
  mapping(address => bool) public whitelistClaimed;
  
  constructor() ERC721A("GTON Memorable NFT", "GTONMEM") {
    initOwner(msg.sender);
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

      return string(
          abi.encodePacked(
            'https://nft.gton.capital/memorable/metadata/1.json'
          )
      );
  }

  function amIWhitelisted(bytes32[] calldata _merkleProof) public view returns (bool whitelisted) {
    // Check if claim already happened
    require(!whitelistClaimed[msg.sender], "Address already claimed" );
    // Create leaf node with user's address
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    // Check if proof is valid
    require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid Merkle Proof");

    return true;
  }

  function whitelistMint(bytes32[] calldata _merkleProof) public {
    require(amIWhitelisted(_merkleProof));

    whitelistClaimed[msg.sender] = true;
    _mint(msg.sender, 1);
  }

  function mint(address to, uint256 quantity) external onlyAdminOrOwner {
    _mint(to, quantity);
  }
}
