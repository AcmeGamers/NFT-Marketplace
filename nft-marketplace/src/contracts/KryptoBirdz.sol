// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ERC721Connector.sol";

contract KryptoBirdz is Connector {
     
    // array to store data
    string [] public kryptoBirdz;
    
    function mint(string memory _kryptoBird) public {
        kryptoBirdz.push(_kryptoBird);
        uint _id = kryptoBirdz.length - 1;

        _mint(msg.sender, _id);
    }

    string private name = 'KryptoBird';
    string private symbol = 'KBIRDZ';
    
    constructor() Connector(name, symbol){}
}
