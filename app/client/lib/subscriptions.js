
/**
Contract functions

@module contract
**/

/**
The Contract class containing contract functions

@class Contract
@constructor
**/

Subscriptions = {};


Subscriptions.isChecksumAddress = function (address) {
  // Check each case
  address = address.replace('0x','');
  var addressHash = web3.sha3(address.toLowerCase());
  for (var i = 0; i < 40; i++ ) {
      // the nth letter should be uppercase if the nth digit of casemap is 1
      if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
          return false;
      }
  }
  return true;
};

Subscriptions.isAddress = function (address) {
  // function isAddress(address) {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      // check if it has the basic requirements of an address
      return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
      // If it's all small caps or all all caps, return "true
      return true;
  } else {
      // Otherwise check each case
      return Contract.isChecksumAddress(address);
  }
};


Subscriptions.json = {
  "contractName": "Subscriptions",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "channel",
          "type": "address"
        }
      ],
      "name": "returnDonationCount",
      "outputs": [
        {
          "name": "donationCount",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "subs",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "unregisterChannel",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "registerChannelFromContract",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "returnChannels",
      "outputs": [
        {
          "name": "_subs",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "subscribeToChannel",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "channel",
          "type": "address"
        }
      ],
      "name": "returnTotalDonations",
      "outputs": [
        {
          "name": "totalDonations",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_channel",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "donateTo",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "returnChannelCount",
      "outputs": [
        {
          "name": "channelCount",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "totalSubscribers",
      "outputs": [
        {
          "name": "total",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "channelExist",
      "outputs": [
        {
          "name": "exist",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "channels",
      "outputs": [
        {
          "name": "contractAddress",
          "type": "address"
        },
        {
          "name": "subCount",
          "type": "uint256"
        },
        {
          "name": "totalDonations",
          "type": "uint256"
        },
        {
          "name": "donationCount",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "channelAdd",
          "type": "address"
        }
      ],
      "name": "registerChannelManually",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allChannels",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "changeOwner",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "channel",
          "type": "address"
        }
      ],
      "name": "returnContractAddress",
      "outputs": [
        {
          "name": "conAddr",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newTokenAddress",
          "type": "address"
        }
      ],
      "name": "changeTokenAddress",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "hueyTokenAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "TotalChannels",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "channel",
          "type": "address"
        }
      ],
      "name": "returnSubCount",
      "outputs": [
        {
          "name": "subCount",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ],
},

  //Subscriptions.subContractAddress = "0x7213f650be9ee1e28067241eb18856c149642395";
  Subscriptions.subContractAddress = LocalStore.get('subContractAddress');
  Subscriptions.abi = Subscriptions.json.abi;
  console.log(web3.eth);
  Subscriptions.subCon = web3.eth.contract(Subscriptions.abi).at(Subscriptions.subContractAddress);
  
  Subscriptions.getChannelContract = function(address, callback)  {
    var conAddress = "";

    if(!web3.isAddress(address)) {
        console.log(false);
        callback("Not valid address",conAddress);
     } else {
        Subscriptions.subCon.returnContractAddress.call(address, function(error,res) {
            if(!error) {
                conAddress = res;
            }
            callback(error,conAddress);
        });
    }
  };
  
  Subscriptions.getChannels = function(callback) {
    
      var results = new Array;
      Subscriptions.subCon.returnChannels.call(function(error,res){
          if(!error){
              for (var i = 0; i < res.length; i++) {
                  var obj = {
                      owner: res[i],
                      description: "desc",
                      trunc: res[i].substring(0,12) + "..."
                  };
                  console.log("j"+obj.active);
                  results.push(obj);
              }
          }
          callback(error, results);
      });
  
  };

  Subscriptions.channelExist = function(address,callback) {
    var exist = false;
    if(!web3.isAddress(address)) {
       console.log(false);
       callback("Not valid address",false);
    } else {
        Subscriptions.subCon.channelExist.call(address,function(error,res) {
        if(!error) {
          console.log(res);
          exist = res;
        }
        callback(error,exist);
      });
    }

  };

  Subscriptions.subscribeTo = function(address, callback) {
    Subscriptions.channelExist(address,function(err,result){
      if(err || !result){
        console.log('')
        callback("channel doesn't exist", "");
      } else {
        console.log("subscribing to channel"+ address);
        web3.eth.getGasPrice(function(err,result){
          var gasprice = result;
          Subscriptions.subCon.subscribeToChannel.estimateGas(address, {}, function(err,result){
            if(!err) {
              var gasEst = result;
                Subscriptions.subCon.subscribeToChannel(address, {gas:gasEst, gasPrice:gasprice}, function(err,result){
                  console.log(err);
                  console.log('r',result);
                  callback(err,result);
                });
              }
            });
        });
        
      }
    });
  };

  Subscriptions.getTotalSubs = function(address, callback) {
    Subscriptions.channelExist(address, function(err,result) {
      console.log("here",address);
      if(err || !result) {
        console.log(err,result);
        callback(err, "");
      } else {
        Subscriptions.subCon.returnSubCount.call(address,function(err,result){
          console.log(result);
          callback(err,result);
      });
    }
  });
};

Subscriptions.getTotalDonations = function(address, callback)  {
  Subscriptions.channelExist(address, function(err,result) {
    console.log("here",address);
    if(err || !result) {
      console.log(err,result);
      callback(err, "");
    } else {
      Subscriptions.subCon.returnTotalDonations.call(address,function(err,result){
        console.log(result);
        callback(err,result);
    });
  }
});
};

Subscriptions.getDonationCount = function(address, callback)  {
  Subscriptions.channelExist(address, function(err,result) {
    console.log("here",address);
    if(err || !result) {
      console.log(err,result);
      callback(err, "");
    } else {
      Subscriptions.subCon.returnDonationCount.call(address,function(err,result){
        console.log(result);
        callback(err,result);
    });
  }
});
};

  Subscriptions.registerChannel = function(chanAddress, callback)  {
    web3.eth.getGasPrice(function(err,result){
      var gasprice = result.c[0];
      Subscriptions.subCon.registerChannelManually.estimateGas(chanAddress, {}, function(err,result){
        if(!err) {
          var gasEst = result;
            Subscriptions.subCon.registerChannelManually(chanAddress, {gas:gasEst, gasPrice:gasprice}, function(err,result){
              console.log(err);
              callback(err,result);
            });
          }
        });

    });
  };

  Subscriptions.getChannelCount = function (callback)  {
    Subscriptions.subCon.returnChannelCount.call(function(err, result){
      callback(err, result);
    });
  };

  // Subscriptions.getAllChannels = function(callback) {
  //   var channelArray = new Array;
  //   Subscriptions.getChannelCount(function(err, result){
  //     if(!err && result)  {
  //       console.log('totalChannels', result);
  //     } else {
  //       for(i = 0; i < result; i++) {

  //       }
  //     }



  //   });

    
  // };


  
