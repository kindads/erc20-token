var utils = require('./utils.js');
var CaptivateToken = artifacts.require('./CaptivateToken.sol');

contract("CaptivateToken", (accounts) => {

  var creatorAddress = accounts[0];
  var recipientAddress = accounts[1];
  var delegateAddress = accounts[2];

  it('should have the name Captivate Token', () => {
    return CaptivateToken.deployed().then((instance) => {
      return instance.name.call()
    }).then((name) => {
      assert.equal(name, 'Captivate Token', 'Captivate Token wasn\'t the name');
    });
  });

  it('should have the symbol CAPT', () => {
    return CaptivateToken.deployed().then((instance) => {
      return instance.symbol.call()
    }).then((symbol) => {
      assert.equal(symbol, 'CAPT', 'CAPT wasn\'t the symbol')
    });
  });

  it('should have decimals set to 8', () => {
    return CaptivateToken.deployed().then((instance) => {
      return instance.decimals.call()
    }).then((decimals) => {
      assert.equal(decimals, 8, '8 wasn\'t the value of decimals')
    });
  });

  it('Should contain 61e+14 Captivate Tokens in circulation', () => {
    return CaptivateToken.deployed().then((instance) => {
      return instance.totalSupply.call();
    }).then(balance => {
      assert.equal(balance.valueOf(), 61e+14, 'Wrong number of token in circulation');
    });
  });

  it('Should contain 61e+24 Captivate Tokens in the creator balance', () => {
    return CaptivateToken.deployed().then(instance => {
      return instance.balanceOf.call(creatorAddress)
    }).then(balance => {
      assert.equal(balance.valueOf(), 61e+14, '61e+24 wasn\'t in the creator balance');
    })
  });

  it('Should tranfer 1e+24 Captivate Tokens to the recipient balance', () => {
    var CaptivateTokenInstance;

    return CaptivateToken.deployed().then(instance => {
      CaptivateTokenInstance = instance;
      return CaptivateTokenInstance.transfer(recipientAddress, 1e+14, {
        from: creatorAddress
      });
    }).then(result => {
      return CaptivateTokenInstance.balanceOf.call(recipientAddress);
    }).then(recipientBalance => {
      assert.equal(recipientBalance.valueOf(), 1e+14, '1e+24 wasn\'t in the recipient balance');
      return CaptivateTokenInstance.balanceOf.call(creatorAddress);
    }).then(creatorBalance => {
      assert.equal(creatorBalance.valueOf(), 60e+14, '60e+24 wasn\'t in the creator balance');
    });
  });

  it('Should approve 1e+24 Captivate Tokens to the delegated balance', () => {
    var CaptivateTokenInstance;

    return CaptivateToken.deployed().then(instance => {
      CaptivateTokenInstance = instance;
      return CaptivateTokenInstance.approve(delegateAddress, 1e+14, {
        from: creatorAddress
      });
    }).then(result => {
      return CaptivateTokenInstance.allowance.call(creatorAddress, delegateAddress);
    }).then(delegateAllowance => {
      assert.equal(delegateAllowance.valueOf(), 1e+14, '1e+24 wasn\'t approved ti he delegated adddress');
    });
  });

  it('Should transfer 1e+24 Captivate Tokens form the creator to the alt recipient via the delegated address', () => {
    var CaptivateTokenInstance;

    return CaptivateToken.deployed().then(instance => {
      CaptivateTokenInstance = instance;
      return CaptivateTokenInstance.transferFrom(creatorAddress, recipientAddress, .5e+14, {
        from: delegateAddress
      });
    }).then(result => {
      return CaptivateTokenInstance.balanceOf.call(recipientAddress);
    }).then(recipientBalance => {
      assert.equal(recipientBalance.valueOf(), 1.5e+14, '1e+24 wasn\'t in the recipient balance');
      return CaptivateTokenInstance.allowance.call(creatorAddress, delegateAddress);
    }).then(delegateAllowance => {
      assert.equal(delegateAllowance.valueOf(), .5e+14, '.5e+24 wasn\'t set as the delegated balance');
    });
  });

  it('should not allow transfer() when _to is null', () => {
    var CaptivateTokenInstance;

    return CaptivateToken.deployed().then((instance) => {
        CaptivateTokenInstance = instance
        return CaptivateTokenInstance.transfer(null, 1000000, {
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
    var CaptivateTokenInstance;

    return CaptivateToken.deployed().then((instance) => {
        CaptivateTokenInstance = instance;
        return CaptivateTokenInstance.transfer('0x0000000000000000000000000000000000000000', 1000000, {
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
    var CaptivateTokenInstance;

    return CaptivateToken.deployed().then((instance) => {
        CaptivateTokenInstance = instance
        return CaptivateTokenInstance.approve(recipientAddress, 1000000, {
          from: creatorAddress
        })
      }).then(() => {
        utils.assertEvent(CaptivateTokenInstance, {
          event: 'Approval'
        })
      }).then(() => {
        return CaptivateTokenInstance.transferFrom(creatorAddress, null, 1000000, {
          from: recipientAddress
        })
      }).then(assert.fail)
      .catch((error) => {
        assert(
          error.message.indexOf('revert') >= 0,
          'accounts trying to transferFrom() when _to is null should throw an revert exception.'
        );
      }).then(() => {
        CaptivateTokenInstance.approve(recipientAddress, 0, {
          from: creatorAddress
        });
      });
  });

  it('should not allow transferFrom() when _to is 0x0000000000000000000000000000000000000000', () => {
    var CaptivateTokenInstance;

    return CaptivateToken.deployed().then((instance) => {
        CaptivateTokenInstance = instance;
        return CaptivateTokenInstance.approve(recipientAddress, 1000000, {
          from: creatorAddress
        })
      }).then(() => {
        utils.assertEvent(CaptivateTokenInstance, {
          event: 'Approval'
        })
      }).then(() => {
        return CaptivateTokenInstance.transferFrom(creatorAddress, '0x0000000000000000000000000000000000000000', 1000000, {
          from: recipientAddress
        })
      }).then(assert.fail)
      .catch((error) => {
        assert(
          error.message.indexOf('revert') >= 0,
          'accounts trying to transferFrom() when _to is 0x0000000000000000000000000000000000000000 should throw an revert exception.'
        );
      }).then(() => {
        CaptivateTokenInstance.approve(recipientAddress, 0, {
          from: creatorAddress
        });
      })
  })

});
