var HueyToken = artifacts.require("./HueyToken.sol");
var Subscriptions = artifacts.require("./Subscriptions.sol");

module.exports = function(deployer) {
    deployer.deploy(HueyToken);
    deployer.deploy(Subscriptions);
};
