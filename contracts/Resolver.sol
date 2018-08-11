pragma solidity ^0.4.24;

// contract deployed on Ropsten at 0x3aF6597B35F36b7f4eC8164FCa5b3819b7bB1588

contract Resolver {
    
    mapping(bytes32 => string) allHashes;
    
    function add(bytes32 domainHash, string valueHash) external {
        allHashes[domainHash] = valueHash;
    }
    
    function getHash(bytes32 domainHash) public view returns(string)  {
        return allHashes[domainHash];
    }
    
    
}