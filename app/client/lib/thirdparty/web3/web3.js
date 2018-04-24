
web3Util = {};
web3Util.restart = function(callback=function(result){}) {
    if(typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        web3.eth.getAccounts(function(error, result) {
            if(!error && result.length > 0){
                web3.eth.defaultAccount = result[0];
                //console.log(web3.eth.defaultAccount);
                callback(true);
            }
            else{
                callback(false);
            }
        });
    }
    else {
        web3 = new Web3(new Web3.providers.HttpProvider(LocalStore.get('nodeUrl')));
        web3.eth.getAccounts(function(error, result) {
            if(!error && result.length){
                web3.eth.defaultAccount = result[0];
                callback(true);
            }else{
                callback(false);
            }
        });
    }
};


web3Util.restart();
