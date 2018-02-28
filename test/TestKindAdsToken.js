var utils = require('./utils.js');
var KindAdsToken = artifacts.require('./KindAdsToken.sol');

contract("KindAdsToken", (accounts) => {

  var creatorAddress = accounts[0];
  var recipientAddress = accounts[1];
  var delegateAddress = accounts[2];
  var buyerAddress = accounts[3];

  it('should have the name Kind Ads Token', () => {
    return KindAdsToken.deployed().then((instance) => {
      return instance.name.call()
    }).then((name) => {
      assert.equal(name, 'Kind Ads Token', 'Kind Ads Token wasn\'t the name');
    });
  });

  it('should have the symbol KIND', () => {
    return KindAdsToken.deployed().then((instance) => {
      return instance.symbol.call()
    }).then((symbol) => {
      assert.equal(symbol, 'KIND', 'KIND wasn\'t the symbol')
    });
  });

  it('should have decimals set to 8', () => {
    return KindAdsToken.deployed().then((instance) => {
      return instance.decimals.call()
    }).then((decimals) => {
      assert.equal(decimals, 8, '8 wasn\'t the value of decimals')
    });
  });

  it('Should contain 61e+14 Kind Ad Tokens in circulation', () => {
    return KindAdsToken.deployed().then((instance) => {
      return instance.totalSupply.call();
    }).then(balance => {
      assert.equal(balance.valueOf(), 61e+14, 'Wrong number of token in circulation');
    });
  });

  it('Should contain 61e+24 Kind Ad Tokens in the creator balance', () => {
    return KindAdsToken.deployed().then(instance => {
      return instance.balanceOf.call(creatorAddress)
    }).then(balance => {
      assert.equal(balance.valueOf(), 61e+14, '61e+24 wasn\'t in the creator balance');
    })
  });

  it('Should tranfer 1e+24 Kind Ad Tokens to the recipient balance', () => {
    var KindAdsTokenInstance;

    return KindAdsToken.deployed().then(instance => {
      KindAdsTokenInstance = instance;
      return KindAdsTokenInstance.transfer(recipientAddress, 1e+14, {
        from: creatorAddress
      });
    }).then(result => {
      return KindAdsTokenInstance.balanceOf.call(recipientAddress);
    }).then(recipientBalance => {
      assert.equal(recipientBalance.valueOf(), 1e+14, '1e+24 wasn\'t in the recipient balance');
      return KindAdsTokenInstance.balanceOf.call(creatorAddress);
    }).then(creatorBalance => {
      assert.equal(creatorBalance.valueOf(), 60e+14, '60e+24 wasn\'t in the creator balance');
    });
  });

  it('Should approve 1e+24 Kind Ad Tokens to the delegated balance', () => {
    var KindAdsTokenInstance;

    return KindAdsToken.deployed().then(instance => {
      KindAdsTokenInstance = instance;
      return KindAdsTokenInstance.approve(delegateAddress, 1e+14, {
        from: creatorAddress
      });
    }).then(result => {
      return KindAdsTokenInstance.allowance.call(creatorAddress, delegateAddress);
    }).then(delegateAllowance => {
      assert.equal(delegateAllowance.valueOf(), 1e+14, '1e+24 wasn\'t approved ti he delegated adddress');
    });
  });

  it('Should transfer 1e+24 Kind Ad Tokens form the creator to the alt recipient via the delegated address', () => {
    var KindAdsTokenInstance;

    return KindAdsToken.deployed().then(instance => {
      KindAdsTokenInstance = instance;
      return KindAdsTokenInstance.transferFrom(creatorAddress, recipientAddress, .5e+14, {
        from: delegateAddress
      });
    }).then(result => {
      return KindAdsTokenInstance.balanceOf.call(recipientAddress);
    }).then(recipientBalance => {
      assert.equal(recipientBalance.valueOf(), 1.5e+14, '1e+24 wasn\'t in the recipient balance');
      return KindAdsTokenInstance.allowance.call(creatorAddress, delegateAddress);
    }).then(delegateAllowance => {
      assert.equal(delegateAllowance.valueOf(), .5e+14, '.5e+24 wasn\'t set as the delegated balance');
    });
  });

  it('should not allow transfer() when _to is null', () => {
    var KindAdsTokenInstance;

    return KindAdsToken.deployed().then((instance) => {
        KindAdsTokenInstance = instance
        return KindAdsTokenInstance.transfer(null, 1000000, {
          from: creatorAddress
        })
      }).then(assert.fail)
      .catch((error) => {
        assert(error.message.indexOf('revert') >= 0,
          'accounts trying to transfer() when _to is null should throw an revert exception.'
        );
      });
  });

  it('should not allow transfer() when _to is 0x0000000000000000000000000000000000000000', () => {
    var KindAdsTokenInstance;

    return KindAdsToken.deployed().then((instance) => {
        KindAdsTokenInstance = instance;
        return KindAdsTokenInstance.transfer('0x0000000000000000000000000000000000000000', 1000000, {
          from: creatorAddress
        });
      }).then(assert.fail)
      .catch((error) => {
        assert(
          error.message.indexOf('revert') >= 0,
          'accounts trying to transfer() when _to is 0x0000000000000000000000000000000000000000 should throw an revert exception.'
        );
      });
  });

  it('should not allow transferFrom() when _to is null', () => {
    var KindAdsTokenInstance;

    return KindAdsToken.deployed().then((instance) => {
        KindAdsTokenInstance = instance
        return KindAdsTokenInstance.approve(recipientAddress, 1000000, {
          from: creatorAddress
        })
      }).then(() => {
        utils.assertEvent(KindAdsTokenInstance, {
          event: 'Approval'
        })
      }).then(() => {
        return KindAdsTokenInstance.transferFrom(creatorAddress, null, 1000000, {
          from: recipientAddress
        })
      }).then(assert.fail)
      .catch((error) => {
        assert(
          error.message.indexOf('revert') >= 0,
          'accounts trying to transferFrom() when _to is null should throw an revert exception.'
        );
      }).then(() => {
        KindAdsTokenInstance.approve(recipientAddress, 0, {
          from: creatorAddress
        });
      });
  });

  it('should not allow transferFrom() when _to is 0x0000000000000000000000000000000000000000', () => {
    var KindAdsTokenInstance;

    return KindAdsToken.deployed().then((instance) => {
        KindAdsTokenInstance = instance;
        return KindAdsTokenInstance.approve(recipientAddress, 1000000, {
          from: creatorAddress
        })
      }).then(() => {
        utils.assertEvent(KindAdsTokenInstance, {
          event: 'Approval'
        })
      }).then(() => {
        return KindAdsTokenInstance.transferFrom(creatorAddress, '0x0000000000000000000000000000000000000000', 1000000, {
          from: recipientAddress
        })
      }).then(assert.fail)
      .catch((error) => {
        assert(
          error.message.indexOf('revert') >= 0,
          'accounts trying to transferFrom() when _to is 0x0000000000000000000000000000000000000000 should throw an revert exception.'
        );
      }).then(() => {
        KindAdsTokenInstance.approve(recipientAddress, 0, {
          from: creatorAddress
        });
      })
  })

  it('Should approve 100 Kind Ad Tokens to the Owner', () => {
    var KindAdsTokenInstance;

    return KindAdsToken.deployed().then(instance => {
      KindAdsTokenInstance = instance;
      return KindAdsTokenInstance.approveOwner(buyerAddress, 100, {
        from: creatorAddress
      });
    }).then(result => {
      return KindAdsTokenInstance.allowance.call(buyerAddress, creatorAddress);
    }).then(delegateAllowance => {
      assert.equal(delegateAllowance.valueOf(), 100, '10 wasn\'t approved to the Owner adddress');
    });
  });

  it('Should NOT approve 100 Kind Ad Tokens to the Owner', () => {
    var KindAdsTokenInstance;

    return KindAdsToken.deployed().then(instance => {
      KindAdsTokenInstance = instance;
      return KindAdsTokenInstance.approveOwner(buyerAddress, 100, {
        from: delegateAddress
      });
    }).then(assert.fail)
      .catch((error) => {
        assert(
          error.message.indexOf('revert') >= 0,'Not ownwer is trying to call aproveOwner'
        );
      });
  });

});
