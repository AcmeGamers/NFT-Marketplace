// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Connector.sol";

contract KryptoBirdz is Connector {
     
    // Making an array
    string [] public kryptoBirdz;

    // Error Handeling
    mapping(string => bool) _kryptoBirdExists;

    function mint(string memory _kryptoBird) public {
        require(_kryptoBirdExists[_kryptoBird] == false, "KryptoBird Already Exists");
        
        kryptoBirdz.push(_kryptoBird);
        uint256 _id = kryptoBirdz.length - 1;
        _mint(msg.sender, _id);
        _updateTokens(_id);

        _kryptoBirdExists[_kryptoBird] =  true;
    }
    
    string private name = "KryptoBirdz";
    string private symbol = "KBirdz";
    
    constructor() Connector(name, symbol) {}    
}


































// // array to store data
//     string[] public kryptoBirdz;
    
//     // Error Handeling
//     mapping(string => bool) _kryptoBirdzExists;

//     function mint(string memory _kryptoBird) public {
//         require(_kryptoBirdzExists[_kryptoBird] == false, "KryptoBirdz: The kryptoBirdz already exists.");
        
//         kryptoBirdz.push(_kryptoBird);
//         uint _id = kryptoBirdz.length - 1;

//         _mint(msg.sender, _id);

//         _kryptoBirdzExists[_kryptoBird] = true;
//     }

//     string private name = 'KryptoBird';
//     string private symbol = 'KBIRDZ';
    
//     constructor() Connector(name, symbol){}