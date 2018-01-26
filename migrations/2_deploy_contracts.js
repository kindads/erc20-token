var CaptivateToken = artifacts.require('CaptivateToken.sol');

module.exports = function (deployer) {
  deployer.deploy(CaptivateToken);
}
