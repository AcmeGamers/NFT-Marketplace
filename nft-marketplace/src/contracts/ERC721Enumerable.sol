// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721.sol";

contract ERC721Enumerable is ERC721 {
    uint256[] private _allTokens;

// mapping from tokenld to position in _allTokens array
// mapping of owner to list of all owner token ids
// mapping from token ID index of the owner tokens list I

    // with mapping, place tokenID in _allTokens
    mapping(uint256 => uint256) private _allTokensIndex;

    // with mapping, place Owner owner address in the list of all Owner's IDs
    mapping(address => uint256[]) private _ownedTokens;

    // with mapping, place Token ID in the ownerTokenList
    mapping(uint256 => uint256) private _ownedTokensIndex;

    function totalSupply() external view returns (uint256) {
        return _allTokens.length;
    }

    function _mint(address to, uint256 _tokenID) internal override {
        super._mint(to, _tokenID);
        _allTokens.push(_tokenID);

        _addTokensToAllTokenEnumeration(_tokenID);
        _addTokenToOwnerEnumeration(to, _tokenID);
    }

    function _addTokensToAllTokenEnumeration(uint256 tokenID) private {
        // gets length, example:
        // No value == 0 length
        // * Makes token index 0
        _allTokensIndex[tokenID] = _allTokens.length;

        // adds a value in the _allTokens
        _allTokens.push(tokenID);

        // now when this repeats.
        // * _allTokens.length will give index of 1.
        // * while when a new value gets push, the new index would be 2.
    }

    function _addTokenToOwnerEnumeration(address to, uint256 tokenID) private {
        // 1. ownedTokensIndex tokenld set to address of ownedTokens position
        _ownedTokensIndex[tokenID] = _ownedTokens[to].length;
        
        // 2. add address and token id to the _ownedTokens 
        _ownedTokens[to].push(tokenID);
    }

    // Gives the amount of tokens
    function tokenByIndex() public view returns(uint256 tokenIndex){
        return _allTokens.length;
    }

    // Gives the amount of by Owners 
    function tokenOwnerByIndex(uint256 tokenID) public view returns(uint256 tokenIndex){
        return _allTokensIndex[tokenID];
    }
}





















// uint256[] private _allTokens;

// // mapping from tokenld to position in _allTokens array
// mapping (uint256 => uint256) private _allTokensIndex;

// // mapping of owner to list of all owner token ids
// mapping (address => uint256[]) private _ownedTokens;

// // mapping from token ID index of the owner tokens list I
// mapping (uint256 => uint256) private _ownedTokenIndex;


// function totalSupply() external view returns (uint256) {
//     return _allTokens.length;
// }

// function _addTokensToTotalSupply(uint256 tokenID) private {
//     _allTokens.push(_allTokensIndex[tokenID]);
// }