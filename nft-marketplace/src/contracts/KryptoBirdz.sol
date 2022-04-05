// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ERC721Connector.sol";

contract KryptoBirdz is Connector {
     
    string private name = 'KryptoBird';
    string private symbol = 'KBIRDZ';
    
    constructor() Connector(name, symbol){}
}
