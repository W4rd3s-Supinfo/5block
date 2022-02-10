// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract Wheel is Ownable {
    uint256 public minBet = 0.05 ether;
    uint256 public maxBet = 10 ether;

    event SpinResult(uint256 winNumber, bool isWin);

    enum BetType {
        EVEN,
        ODD,
        RED,
        BLACK,
        GREEN,
        NUMBER
    }

    uint256 private randNonce = 0;
    mapping(BetType => uint256) public multipliers;

    constructor() {
        multipliers[BetType.EVEN] = 2;
        multipliers[BetType.ODD] = 2;
        multipliers[BetType.RED] = 2;
        multipliers[BetType.BLACK] = 2;
        multipliers[BetType.GREEN] = 5;
        multipliers[BetType.NUMBER] = 5;
    }

    // Set max bet value
    function setMaxBet(uint256 _maxBet) external onlyOwner {
        require(_maxBet > minBet, "maxBet must be bigger than minBet");
        maxBet = _maxBet;
    }

    // Set max bet value
    function setMinBet(uint256 _minBet) external onlyOwner {
        require(
            _minBet > 0 && _minBet < maxBet,
            "minBet must be between 0 and maxBet"
        );
        minBet = _minBet;
    }

    // return contract balance
    function contratBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    // get contract balance
    function getBalance() external payable onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Failed to send prize");
    }

    // Get random number
    function getRandom(uint256 _modulus) internal returns (uint256) {
        randNonce++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % _modulus;
    }

    function bet(BetType _betType, uint256 _betNumber)
        public
        payable
        returns (uint256 winNumber, bool isWin)
    {
        require(
            msg.value >= minBet && msg.value <= maxBet,
            "bet is outside allowed limits"
        );

        bool win = false;
        uint256 randomNumber = getRandom(37); // 0-36
        if (_betType == BetType.NUMBER) {
            if (randomNumber == _betNumber) win = true;
        } else if (_betType == BetType.GREEN) {
            if (randomNumber == 0) win = true;
        } else if (_betType == BetType.EVEN) {
            if (randomNumber % 2 == 0) win = true;
        } else if (_betType == BetType.ODD) {
            if (randomNumber % 2 == 1) win = true;
        } else if (_betType == BetType.RED) {
            if (
                randomNumber <= 10 || (randomNumber >= 19 && randomNumber <= 28)
            ) {
                win = (randomNumber % 2 == 1);
            } else {
                win = (randomNumber % 2 == 0);
            }
        } else if (_betType == BetType.BLACK) {
            if (
                randomNumber <= 10 || (randomNumber >= 19 && randomNumber <= 28)
            ) {
                win = (randomNumber % 2 == 0);
            } else {
                win = (randomNumber % 2 == 1);
            }
        }

        if (win) {
            uint256 prize = msg.value * multipliers[_betType];
            require(
                address(this).balance >= prize,
                "Insufficient contract balance to cover the prize"
            );

            (bool success, ) = msg.sender.call{value: prize}("");
            require(success, "Failed to send prize");
        }
        emit SpinResult(randomNumber, win);
        return (randomNumber, win);
    }
}
