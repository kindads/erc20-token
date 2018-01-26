pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "../contracts/CaptivateToken.sol";


contract TestCaptivateToken {

  CaptivateToken private _captivateToken;
  address private _owner;

  function TestCaptivateToken() public {
    _owner = msg.sender;
  }

  function beforeEach() public {
    _captivateToken = new CaptivateToken();
  }

  function testConstructor() public {
    uint allocatedTokens = _captivateToken.balanceOf(this);
    Assert.equal(allocatedTokens, 61000000000000000000000000, "Contract creator should hold 61e24 ( 61000000000000000000000000 ) tokens in the wallet");
  }

}
