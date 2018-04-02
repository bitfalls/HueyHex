//Module for interaction with channel contracts.
Channel = {};

Channel.itemEnum = {
	0:"BitTorrent",
	1:"IPFS",
	2:"Swarm"
};

Channel.totalItems = 3;

Channel.isChecksumAddress = function (address) {
  address = address.replace('0x','');
  var addressHash = web3.sha3(address.toLowerCase());
  for (var i = 0; i < 40; i++ ) {
      if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
          return false;
      }
  }
  return true;
};

///Channel.byteCode = "0x6060604052341561000f57600080fd5b604051610ea6380380610ea68339810160405280805182019190602001805182019190602001805190602001909190505033600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055504260018190555080600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f302e332e300000000000000000000000000000000000000000000000000000008152506005908051906020019061011492919061014b565b50816003908051906020019061012b92919061014b565b50826002908051906020019061014292919061014b565b505050506101f0565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061018c57805160ff19168380011785556101ba565b828001600101855582156101ba579182015b828111156101b957825182559160200191906001019061019e565b5b5090506101c791906101cb565b5090565b6101ed91905b808211156101e95760008160009055506001016101d1565b5090565b90565b610ca7806101ff6000396000f3006060604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b5146100bf5780634a79d50c146100d45780635bffa8ea146101625780635c7b6557146101b357806365211b29146101ed5780637284e4161461023457806389313286146102c25780638da5cb5b1461033d5780639da23ecf14610392578063e58ad45314610420578063fa93a93d14610475578063fc1e641414610507575b600080fd5b34156100ca57600080fd5b6100d2610552565b005b34156100df57600080fd5b6100e76105e9565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561012757808201518184015260208101905061010c565b50505050905090810190601f1680156101545780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016d57600080fd5b610199600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610687565b604051808215151515815260200191505060405180910390f35b34156101be57600080fd5b6101d7600480803560ff1690602001909190505061072f565b6040518082815260200191505060405180910390f35b34156101f857600080fd5b61021e60048080356000191690602001909190803560ff16906020019091905050610754565b6040518082815260200191505060405180910390f35b341561023f57600080fd5b6102476107fe565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561028757808201518184015260208101905061026c565b50505050905090810190601f1680156102b45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156102cd57600080fd5b6102e6600480803560ff1690602001909190505061089c565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561032957808201518184015260208101905061030e565b505050509050019250505060405180910390f35b341561034857600080fd5b610350610916565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561039d57600080fd5b6103a561093c565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103e55780820151818401526020810190506103ca565b50505050905090810190601f1680156104125780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561042b57600080fd5b6104336109da565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561048057600080fd5b6104e960048080356000191690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803560ff16906020019091905050610a00565b60405180826000191660001916815260200191505060405180910390f35b341561051257600080fd5b61053860048080356000191690602001909190803560ff16906020019091905050610b5a565b604051808215151515815260200191505060405180910390f35b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105ae57600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b60028054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561067f5780601f106106545761010080835404028352916020019161067f565b820191906000526020600020905b81548152906001019060200180831161066257829003601f168201915b505050505081565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106e557600080fd5b81600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060019050919050565b60008060008360ff1660ff168152602001908152602001600020805490509050919050565b6000807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9150600090505b6000808460ff1660ff168152602001908152602001600020805490508110156107f7576000808460ff1660ff168152602001908152602001600020818154811015156107c757fe5b90600052602060002090015460001916846000191614156107ea578091506107f7565b808060010191505061077f565b5092915050565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108945780601f1061086957610100808354040283529160200191610894565b820191906000526020600020905b81548152906001019060200180831161087757829003601f168201915b505050505081565b6108a4610c16565b6000808360ff1660ff16815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561090a57602002820191906000526020600020905b815460001916815260200190600101908083116108f2575b50505050509050919050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60058054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109d25780601f106109a7576101008083540402835291602001916109d2565b820191906000526020600020905b8154815290600101906020018083116109b557829003601f168201915b505050505081565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a5e57600080fd5b83600019168260ff167f78c99993dc3945a7b513b5ddcb2979653ffed26ca1b4cfce3d1bbdac3f33824c85426040518080602001838152602001828103825284818151815260200191508051906020019080838360005b83811015610ad0578082015181840152602081019050610ab5565b50505050905090810190601f168015610afd5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a36000808360ff1660ff1681526020019081526020016000208054806001018281610b359190610c2a565b9160005260206000209001600086909190915090600019169055508390509392505050565b600080600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610bb957600080fd5b60009150610bc78484610754565b90506000811015610bd757600080fd5b6000808460ff1660ff16815260200190815260200160002081815481101515610bfc57fe5b906000526020600020900160009055600191505092915050565b602060405190810160405280600081525090565b815481835581811511610c5157818360005260206000209182019101610c509190610c56565b5b505050565b610c7891905b80821115610c74576000816000905550600101610c5c565b5090565b905600a165627a7a72305820a9156228b6d1079b65202e7337d55d048b2df0464f59b73e8b413c4650e709760029";
Channel.byteCode = "0x6060604052341561000f57600080fd5b604051610cce380380610cce8339810160405280805182019190602001805182019190505033600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550426001819055506040805190810160405280600581526020017f302e342e30000000000000000000000000000000000000000000000000000000815250600590805190602001906100c79291906100fd565b5080600390805190602001906100de9291906100fd565b5081600290805190602001906100f59291906100fd565b5050506101a2565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061013e57805160ff191683800117855561016c565b8280016001018555821561016c579182015b8281111561016b578251825591602001919060010190610150565b5b509050610179919061017d565b5090565b61019f91905b8082111561019b576000816000905550600101610183565b5090565b90565b610b1d806101b16000396000f3006060604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b5146100a95780634a79d50c146100be5780635c7b65571461014c57806365211b29146101865780637284e416146101cd578063893132861461025b5780638da5cb5b146102d65780639da23ecf1461032b578063fa93a93d146103b9578063fc1e64141461044b575b600080fd5b34156100b457600080fd5b6100bc610496565b005b34156100c957600080fd5b6100d161052d565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101115780820151818401526020810190506100f6565b50505050905090810190601f16801561013e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015757600080fd5b610170600480803560ff169060200190919050506105cb565b6040518082815260200191505060405180910390f35b341561019157600080fd5b6101b760048080356000191690602001909190803560ff169060200190919050506105f0565b6040518082815260200191505060405180910390f35b34156101d857600080fd5b6101e061069a565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610220578082015181840152602081019050610205565b50505050905090810190601f16801561024d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561026657600080fd5b61027f600480803560ff16906020019091905050610738565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156102c25780820151818401526020810190506102a7565b505050509050019250505060405180910390f35b34156102e157600080fd5b6102e96107b2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561033657600080fd5b61033e6107d8565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561037e578082015181840152602081019050610363565b50505050905090810190601f1680156103ab5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156103c457600080fd5b61042d60048080356000191690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803560ff16906020019091905050610876565b60405180826000191660001916815260200191505060405180910390f35b341561045657600080fd5b61047c60048080356000191690602001909190803560ff169060200190919050506109d0565b604051808215151515815260200191505060405180910390f35b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104f257600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105c35780601f10610598576101008083540402835291602001916105c3565b820191906000526020600020905b8154815290600101906020018083116105a657829003601f168201915b505050505081565b60008060008360ff1660ff168152602001908152602001600020805490509050919050565b6000807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9150600090505b6000808460ff1660ff16815260200190815260200160002080549050811015610693576000808460ff1660ff1681526020019081526020016000208181548110151561066357fe5b906000526020600020900154600019168460001916141561068657809150610693565b808060010191505061061b565b5092915050565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107305780601f1061070557610100808354040283529160200191610730565b820191906000526020600020905b81548152906001019060200180831161071357829003601f168201915b505050505081565b610740610a8c565b6000808360ff1660ff1681526020019081526020016000208054806020026020016040519081016040528092919081815260200182805480156107a657602002820191906000526020600020905b8154600019168152602001906001019080831161078e575b50505050509050919050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60058054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561086e5780601f106108435761010080835404028352916020019161086e565b820191906000526020600020905b81548152906001019060200180831161085157829003601f168201915b505050505081565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108d457600080fd5b83600019168260ff167f78c99993dc3945a7b513b5ddcb2979653ffed26ca1b4cfce3d1bbdac3f33824c85426040518080602001838152602001828103825284818151815260200191508051906020019080838360005b8381101561094657808201518184015260208101905061092b565b50505050905090810190601f1680156109735780820380516001836020036101000a031916815260200191505b50935050505060405180910390a36000808360ff1660ff16815260200190815260200160002080548060010182816109ab9190610aa0565b9160005260206000209001600086909190915090600019169055508390509392505050565b600080600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a2f57600080fd5b60009150610a3d84846105f0565b90506000811015610a4d57600080fd5b6000808460ff1660ff16815260200190815260200160002081815481101515610a7257fe5b906000526020600020900160009055600191505092915050565b602060405190810160405280600081525090565b815481835581811511610ac757818360005260206000209182019101610ac69190610acc565b5b505050565b610aee91905b80821115610aea576000816000905550600101610ad2565b5090565b905600a165627a7a7230582033b2e471de4fbf895c2da5def2f0d81c9ae12a926d7ea4aaa8de9472af26b0860029";
Channel.isAddress = function (address) {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
      return true;
  } else {
      return Contract.isChecksumAddress(address);
  }
};

Channel.json = {
  "contractName": "Channel",
  "abi": [
    {
      "constant": false,
      "inputs": [],
      "name": "registerChannel",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "kill",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "title",
      "outputs": [
        {
          "name": "",
          "type": "string"
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
          "name": "_registerAddress",
          "type": "address"
        }
      ],
      "name": "updateRegisterLocation",
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
          "name": "itemEnum",
          "type": "uint8"
        }
      ],
      "name": "itemCount",
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
          "name": "itemHash",
          "type": "bytes32"
        },
        {
          "name": "itemEnum",
          "type": "uint8"
        }
      ],
      "name": "itemIndex",
      "outputs": [
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "description",
      "outputs": [
        {
          "name": "",
          "type": "string"
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
          "name": "itemEnum",
          "type": "uint8"
        }
      ],
      "name": "returnItems",
      "outputs": [
        {
          "name": "items",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
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
      "inputs": [],
      "name": "channelVersion",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "subAddress",
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
          "name": "itemHash",
          "type": "bytes32"
        },
        {
          "name": "itemInfo",
          "type": "string"
        },
        {
          "name": "itemEnum",
          "type": "uint8"
        }
      ],
      "name": "addItemToChannel",
      "outputs": [
        {
          "name": "_itemHash",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "itemHash",
          "type": "bytes32"
        },
        {
          "name": "itemEnum",
          "type": "uint8"
        }
      ],
      "name": "removeItem",
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
      "inputs": [
        {
          "name": "_title",
          "type": "string"
        },
        {
          "name": "_description",
          "type": "string"
        },
        {
          "name": "_registerAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "itemEnum",
          "type": "uint8"
        },
        {
          "indexed": true,
          "name": "itemHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "itemJson",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "addedOn",
          "type": "uint256"
        }
      ],
      "name": "ItemData",
      "type": "event"
    }
  ],
  };

  Channel.abi = Channel.json.abi;
  
  Channel.createContractInstance = function(address)  {
    return web3.eth.contract(Channel.abi).at(address);
  };

  Channel.getTitle = function(address, callback)  {
    var title = "";
    var conInstance = Channel.createContractInstance(address);
    conInstance.title.call(function(error, res) {
        if(!error)  {
            title = res;
        }
        callback(error, title);
    });
  };
  
  Channel.getDescription = function(address, callback)  {
    var description = "";
    
    var conInstance = Channel.createContractInstance(address);
    conInstance.description.call(function(error, res) {
        if(!error)  {
            description = res;
        }
        callback(error, description);
    });
  };


  Channel.returnItems = function(address, totalItems, callback) {
      var returnArray = new Array();
      var error = null;
      var iterations = 0;
      for(var i =0;i < totalItems;i++) {
        Channel.getIndividualItems(address,i,function(array,itemNum,error) {
          returnArray[itemNum] = array;
          iterations++;
          if(iterations == Channel.totalItems) {
             callback(error,returnArray);
          }
        });

      }
      
  };

  Channel.getIndividualItems = function(address, itemNum, callback) {
    var conInstance = Channel.createContractInstance(address);
    conInstance.returnItems.call(itemNum, function(error,items) {
      callback(items,itemNum,error);
      
    });

  };

  Channel.deployContract = function(_title,_description,callback)  {
    var byteCode = Channel.byteCode;
    web3.eth.estimateGas({data: byteCode},function(err,result) {
      var minGasPrice = 1000000000;
      var gasEstimate = result;
      var channelContract = web3.eth.contract(Channel.abi);
      web3.eth.getGasPrice(function(err,result){
        var gasprice = (result.c[0] > minGasPrice) ? result.c[0] : minGasPrice;
        var Gas = gasEstimate*(1.2);//hack for now
        subAddress = LocalStore.get('subContractAddress');
        var myContractReturned = channelContract.new(_title, _description, subAddress,
        {
          from:web3.eth.defaultAccount,
          data:byteCode,
          gas:Gas,
          gasPrice:gasprice
        }, function(err, myContract){
            if(!err) {
              if(!myContract.address) {
                  callback(err,myContract.transactionHash, "");
              } else {
                callback(err,myContract.transactionHash, myContract.address);  
              }
          }
        });
    });
    });
};

Channel.addItem = function(address,itemObject,callback) {
  var chan = Channel.createContractInstance(address);
  var itemInfo = JSON.stringify(itemObject);
  var itemHash = web3.sha3(itemInfo);
  var itemEnum = itemObject.type;
  chan.addItemToChannel.estimateGas(itemHash,itemInfo,itemEnum,function(err,result) {
    var gasEstimate = result;
    var channelContract = web3.eth.contract(Channel.abi);
    web3.eth.getGasPrice(function(err,result){
      var minGasPrice = 1000000000;
      var gasprice = (result.c[0] > minGasPrice) ? result.c[0] : minGasPrice;
      var Gas = gasEstimate*(1.2);//hack for now
      chan.addItemToChannel.sendTransaction(itemHash,itemInfo,itemEnum,{gas:Gas,gasPrice:gasprice},function(err,result) {
        if(!err) {
          callback(err,result);
        };
      });
    });
  });
};

Channel.getEventItems = function(address, callback)  {
  var eventArray = [];
  var tempObj = {};
  var chan = Channel.createContractInstance(address);
  var eventItemArray = new Array;
  var event = chan.allEvents({fromBlock: 0, toBlock: 'latest'});
  var error = "";
  event.get(function(err, eventResult) {
    if (err) {
      callback(err, new Array)
    } else if (eventResult == undefined)  {

    } else {
      var myObj = [];
      for (var i = 0 ; i < eventResult.length ; i++) {
        var jsonStr = eventResult[i].args.itemJson;
        var jsonItem = JSON.parse(jsonStr);
        var index = eventResult[i].args.itemHash;
        var addedOn = eventResult[i].args.addedOn.c[0];
        addedOn = new Date(addedOn*1000);
        addedOn = moment(addedOn).format("MMM/DD/YYYY");
        jsonItem.addedOn = addedOn;
        tempObj = {
          "index": index,
          "data": jsonItem
        };
        myObj.push(tempObj);
      }
      callback(err, myObj);
    }
  });

};

Channel.GetAllItems = function(address,callback) {
  var itemArray = new Array;
  var chan = Channel.createContractInstance(address);
  var itemVisibleList = new Array;
  var itemEventList = new Array;
  var returnArray = new Array(Channel.totalItems);
  var error = "";
  Channel.getEventItems(address, function(err, itemEventArray)  {
    if(!err && itemEventArray !== undefined)  {
      Channel.returnItems(address, Channel.totalItems, function(error,itemVisibleList){
        for(var i = 0 ; i < itemVisibleList.length; i++) {
          var tempReturnArray = new Array;
          var tempArray = itemVisibleList[i];
          for(var j = 0; j < tempArray.length;j++) {
            var itemIndex = tempArray[j];
            for(var k = 0; k < itemEventArray.length; k++) {
              var tempEventItem = itemEventArray[k];
              if(tempEventItem.index == itemIndex) {
                tempReturnArray[tempReturnArray.length] = tempEventItem.data;
              }
            }
          }
          returnArray[i] = tempReturnArray;
          
          if(i == itemVisibleList.length-1) {
            callback(error, returnArray);
          }
        }
      });
    }
  });
  
  
};

