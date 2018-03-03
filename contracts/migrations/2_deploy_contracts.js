var HueyToken = artifacts.require("./HueyToken.sol");
var Subscriptions = artifacts.require("./Subscriptions.sol");

module.exports = function(deployer) {
    deployer.deploy(HueyToken);
    //deployer.deploy(Channel, "First Channel", "The best channel for interesting things", "0x737127fd4587c213ab3046a994a0a7970711356f");
    deployer.deploy(Subscriptions);
};
