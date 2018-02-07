pragma solidity ^0.4.18;

import "./zeppelin-solidity/contracts/token/StandardToken.sol";

/**
* @title Captivate Token
* @dev ERC20 Captivate Token (CPX)
*
* CPX are displayed using 18 decimal places of precision
*
* 1 CPX is equal to:
*   -----------------------------
*   | Units               | CPX |
*   -----------------------------
*   | 100000000           |  1  |
*   | 1 * 10**8           |  1  |
*   | 1e8                 |  1  |
*   | 1e9                 | 10  |
*   -----------------------------
*
* All the initial CPX Tokens are assigned to the creator of this contract
*
*/


contract CaptivateToken is StandardToken {

  string public name = "Captivate Token";
  string public symbol = "CPX";
  uint8 public decimals = 8;
  uint256 public INITIAL_SUPPLY = 61 * (10**6) * 10**8; 

  function CaptivateToken() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

}
