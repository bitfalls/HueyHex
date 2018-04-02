
web3Util = {};
web3Util.restart = function() {
    web3 = new Web3(new Web3.providers.HttpProvider(LocalStore.get('nodeUrl')));
};
if(typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}
else {
    web3Util.restart();
}
