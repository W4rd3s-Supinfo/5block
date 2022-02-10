// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "The caller must be the owner");
        _;
    }

    modifier notOwner() {
        require(msg.sender != owner, "The caller must not be the owner");
        _;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(
            newOwner != address(0),
            "The new owner cannot be the zero address"
        );
        owner = newOwner;
    }
}
