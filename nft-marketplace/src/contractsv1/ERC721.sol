// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721 {

    // Transfering Function
    event Transfer(address indexed to, address indexed from, uint256 indexed _tokenId);

    // By default, uint = uint256, although we can always specify the amount of int.
    // Using token ID to find the Owner
    mapping(uint256 => address) private _tokenOwner;
    
    // Using addresses to check the number of tokens owned by the owner.
    mapping(address => uint256) private _ownedTokens;

    // Minting is the process of converting a digital asset into an NFT.
    
    // How it will work?
    // a function that will get owner adress and their id, we will call that mint
    // address of the asset will belong to owner.
    // and there will be an increase in the amount of tokens.
    // Have to make sure that the mint address is not 0x0
    // and that the asset has already been minted.
    function _mint(address to, uint256 _tokenId) internal virtual {
        // Have to make sure that the address is not 0x0.
        require(to != address(0), "ERC721: The Owner Address is 0x0.");
        
        // Have to make sure that the asset is not already minted
        require(_tokenOwner[_tokenId] == address(0), "ERC721: The token has already been minted");
        
        // setting address of owner
        _tokenOwner[_tokenId] = to;

        // increase in amount of tokens.
        _ownedTokens[to]++;

        // Using the event and that will take emit.
        emit Transfer(address(0), to, _tokenId);
    }

    function balanceOf(address _owner) external view returns (uint256){
        require(_owner != address(0), "ERC721: The Owner Address is 0x0. Owner does not exist.");
        return _ownedTokens[_owner];
    }

    function ownerOf(uint _owner) external view returns (address) {        
        address owner = _tokenOwner[_owner];
        require(owner != address(0), "ERC721: The Owner Address is 0x0. Owner does not exist.");
        return owner;
    }
}