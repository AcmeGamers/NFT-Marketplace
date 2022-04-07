// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Metadata.sol';
import "./ERC721Enumerable.sol";

contract Connector is ERC721Metadata, ERC721Enumerable {
    // This will carry metadata information of the NFT contract and will be used by the marketplace
    constructor(string memory _name, string memory _symbol) ERC721Metadata(_name, _symbol) {
        _name = _name;
        _symbol= _symbol;
    }
}