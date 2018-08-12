pragma solidity ^0.4.24;

// contract deployed on Ropsten at 0x3aF6597B35F36b7f4eC8164FCa5b3819b7bB1588

import "./Identity.sol";

contract DataManager {
    
    mapping(bytes32 => string) allHashes;
    

    event UserIdentityCreated(address indexed userAddress, address indexed identityContractAddress);

    function add(bytes32 domainHash, string valueHash) external {
        allHashes[domainHash] = valueHash;
    }
    
    function getHash(bytes32 domainHash) public view returns(string)  {
        return allHashes[domainHash];
    }

    function constructIdentity(address _userAddress) public returns(address) {
        
        address[] memory adresses = new address[](2);
        adresses[0] = _userAddress;
        adresses[1] = address(this);

        uint8[] memory permissions = new uint8[](2);
        permissions[0] = 15;
        permissions[1] = 7;

        Identity id = new Identity(adresses, permissions);

        emit UserIdentityCreated(_userAddress, address(id));

        return address(id);


    }
    
    
}