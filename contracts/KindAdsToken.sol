pragma solidity ^0.4.18;

import "./zeppelin-solidity/contracts/token/StandardToken.sol";
import "./zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./zeppelin-solidity/contracts/ownership/CanReclaimToken.sol";


/**
* @title Kind Ads Token
* @dev ERC20 Kind Ads Token (KIND)
*
* KIND are displayed using 8 decimal places of precision
*
* 1 KIND is equal to:
*   -----------------------------
*   | Units               |KIND |
*   -----------------------------
*   | 100000000           |  1  |
*   | 1 * 10**8           |  1  |
*   | 1e8                 |  1  |
*   | 1e9                 | 10  |
*   -----------------------------
*
* All the initial KIND Tokens are assigned to the creator of this contract
*
*/


contract KindAdsToken is StandardToken, Ownable, CanReclaimToken {

  string public name = "Kind Ads Token";
  string public symbol = "KIND";
  uint8 public decimals = 8;
  uint256 public INITIAL_SUPPLY = 61 * (10**6) * 10**8;

  /**
   * @dev Initialize the contract with the INITIAL_SUPPLY value and it assigns the amount to the contract creator address
   *
   * Trigger an Transfer event on token creation
   * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
   */
  function KindAdsToken() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    Transfer(0x0, msg.sender, INITIAL_SUPPLY);
  }

}
