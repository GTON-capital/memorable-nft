// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WhitelistStatus is Ownable {

    bytes32 public merkleRoot;

    function setMerkleRoot(bytes32 root) onlyOwner public {
        merkleRoot = root;
    }

    function amIWhitelisted(bytes32[] calldata _merkleProof) public view returns (bool whitelisted) {

        // Create leaf node with user's address
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        // Check if proof is valid
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid Merkle Proof");

        return true;
    }

}
