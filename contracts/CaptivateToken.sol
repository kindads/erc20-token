pragma solidity ^0.4.18;

import zeppelin-solidity/contracts/token/StandardToken.sol;

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
*   | 1000000000000000000 |  1  |
*   | 1 * 10**18          |  1  |
*   | 1e18                |  1  |
*   | 1e19                | 10  |
*   -----------------------------
*
* All the initial CPX Tokens are assigned to the creator of this contract
*
*/

contract CaptivateToken is StandardToken {

  string public constant name = 'Captivate Token';
  string public constant symbol = 'CPX';
  uint8 public constant decimals = 18;
  uint256 public constant INITIAL_SUPPLY = 61000000 * 10**uint256(decimals);

}
