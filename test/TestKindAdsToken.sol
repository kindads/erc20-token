pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "../contracts/KindAdsToken.sol";


contract TestKindAdsToken {

  KindAdsToken private _kindadstoken;
  address private _owner;

  function TestKindAdsToken() public {
    _owner = msg.sender;
  }

  function beforeEach() public {
    _kindadstoken = new KindAdsToken();
  }

  function testConstructor() public {
    uint allocatedTokens = _kindadstoken.balanceOf(this);
    Assert.equal(allocatedTokens, 6100000000000000, "Contract creator should hold 61e24 ( 6100000000000000 ) tokens in the wallet (this)");
  }

  function testTotalSupply() public {
    uint totalSupply = _kindadstoken.totalSupply();
    Assert.equal(totalSupply, 6100000000000000, "There should be 6100000000000000 tokens in circulation");
  }

  function testTransferWithValidAmount() public {
    _kindadstoken.transfer(_owner, 100000000000000);
    uint tranferredTokens = _kindadstoken.balanceOf(_owner);
    uint allocatedTokens = _kindadstoken.balanceOf(this);
    Assert.equal(tranferredTokens, 100000000000000, "Recipient should hold 10000000000000 tokens");
    Assert.equal(allocatedTokens, 6000000000000000, "Contract creator should hold 6000000000000000 tokens");
  }

  function testApproveWhitValidAmount() public {
    bool allocationSuccessful = _kindadstoken.approve(_owner, 100000000000);
    Assert.equal(allocationSuccessful, true, "Token owner should be able to allocate less than or equal to their holdings");
  }

  function testAllowanceWithNoAllocatedBalance() public {
    uint allowanceAvailable = _kindadstoken.allowance(_owner, this);
    Assert.equal(allowanceAvailable, 0, "Spender should not have a balance available");
  }

  function testAllowanceWithAllocatedBalance() public {
    _kindadstoken.approve(_owner, 100000000000);
    uint allowanceAvailable = _kindadstoken.allowance(_owner, this);
    Assert.equal(allowanceAvailable, 0, "Spender should have a balance of 100000000000 available");
  }

}
