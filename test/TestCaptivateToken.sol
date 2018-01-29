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
    Assert.equal(allocatedTokens, 61000000000000000000000000, "Contract creator should hold 61e24 ( 61000000000000000000000000 ) tokens in the wallet (this)");
  }

  function testTotalSupply() public {
    uint totalSupply = _captivateToken.totalSupply();
    Assert.equal(totalSupply, 61000000000000000000000000, "There should be 61000000000000000000000000 tokens in circulation");
  }

  function testTransferWithValidAmount() public {
    _captivateToken.transfer(_owner, 1000000000000000000000000);
    uint tranferredTokens = _captivateToken.balanceOf(_owner);
    uint allocatedTokens = _captivateToken.balanceOf(this);
    Assert.equal(tranferredTokens, 1000000000000000000000000, "Recipient should hold 100000000000000000000000 tokens");
    Assert.equal(allocatedTokens, 60000000000000000000000000, "Contract creator should hold 60000000000000000000000000 tokens");
  }

  function testApproveWhitValidAmount() public {
    bool allocationSuccessful = _captivateToken.approve(_owner, 1000000000000000000000);
    Assert.equal(allocationSuccessful, true, "Token owner should be able to allocate less than or equal to their holdings");
  }

  function testAllowanceWithNoAllocatedBalance() public {
    uint allowanceAvailable = _captivateToken.allowance(_owner, this);
    Assert.equal(allowanceAvailable, 0, "Spender should not have a balance available");
  }

  function testAllowanceWithAllocatedBalance() public {
    _captivateToken.approve(_owner, 1000000000000000000000);
    uint allowanceAvailable = _captivateToken.allowance(_owner, this);
    Assert.equal(allowanceAvailable, 0, "Spender should have a balance of 1000000000000000000000 available");
  }

}
