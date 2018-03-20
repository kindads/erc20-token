var KindAdsToken = artifacts.require('KindAdsToken.sol');

module.exports = function (deployer) {
  deployer.deploy(KindAdsToken);
}
