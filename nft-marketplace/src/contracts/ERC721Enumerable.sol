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

    // with mapping, place Owner ID in the list of all Owner's IDs
    mapping(uint256 => uint256[]) private _allOwnerIndex;

    // with mapping, place Token ID in the ownerTokenList
    mapping(uint256 => uint256) private _ownerTokenList;

    function totalSupply() external view returns (uint256) {
        return _allTokens.length;
    }

    function _mint(address to, uint256 _tokenID) internal override {
        super._mint(to, _tokenID);
        _allTokens.push(_tokenID);
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