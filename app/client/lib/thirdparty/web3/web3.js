// console.log('web3');
// if(typeof web3 == 'undefined'){
//     web3 = new Web3();
// }


if(typeof web3 !== 'undefined') {

    web3 = new Web3(web3.currentProvider);
    
    console.log(web3.eth.defaultAccount);
}
else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8645"));
    web3.eth.getAccounts(function(error, result) {
        if(!error){
            console.log(result);
            web3.eth.defaultAccount = result[0];
            console.log(web3.eth.defaultAccount);
        }
    });
}


//   if (typeof web3 !== 'undefined') {
//     var defaultAccount = web3.eth.defaultAccount;
//     var web3 = new Web3(web3.currentProvider);
//     web3.eth.defaultAccount = defaultAccount;
//   }
//   else {
//     var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8645"));
//     web3.eth.defaultAccount = web3.eth.accounts[0];
//   }