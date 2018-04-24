//module for interacting with the token contract.
Token = {};


Token.isChecksumAddress = function (address) {
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

Token.isAddress = function (address) {
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


Token.json = {
    "contract_name": "HueyToken",
    "abi": [
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_spender",
            "type": "address"
          },
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "totalSup",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_from",
            "type": "address"
          },
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "balance",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "hueyContract",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
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
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
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
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          },
          {
            "name": "_spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "name": "remaining",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_contractAddress",
            "type": "address"
          }
        ],
        "name": "updateHueyAddress",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "donate",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "Donate",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_spender",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      }
    ],
    "unlinked_binary": "0x60606040526303dfd240600055341561001757600080fd5b5b60018054600160a060020a03191633600160a060020a03908116919091179182905560008054929091168152600360205260409020555b5b61097b8061005f6000396000f300606060405236156100cd5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100d2578063095ea7b31461015d57806318160ddd1461019357806323b872dd146101b8578063313ce567146101f457806370a082311461021d5780638c192eae1461024e5780638da5cb5b1461027d57806395d89b41146102ac578063a6f9dae114610337578063a9059cbb1461036a578063dd62ed3e146103a0578063e2335509146103d7578063e69d849d1461040a575b600080fd5b34156100dd57600080fd5b6100e5610440565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101225780820151818401525b602001610109565b50505050905090810190601f16801561014f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016857600080fd5b61017f600160a060020a0360043516602435610477565b604051901515815260200160405180910390f35b341561019e57600080fd5b6101a66104e4565b60405190815260200160405180910390f35b34156101c357600080fd5b61017f600160a060020a03600435811690602435166044356104eb565b604051901515815260200160405180910390f35b34156101ff57600080fd5b610207610607565b60405160ff909116815260200160405180910390f35b341561022857600080fd5b6101a6600160a060020a036004351661060c565b60405190815260200160405180910390f35b341561025957600080fd5b61026161062b565b604051600160a060020a03909116815260200160405180910390f35b341561028857600080fd5b61026161063a565b604051600160a060020a03909116815260200160405180910390f35b34156102b757600080fd5b6100e5610649565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101225780820151818401525b602001610109565b50505050905090810190601f16801561014f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561034257600080fd5b61017f600160a060020a0360043516610680565b604051901515815260200160405180910390f35b341561037557600080fd5b61017f600160a060020a03600435166024356106ce565b604051901515815260200160405180910390f35b34156103ab57600080fd5b6101a6600160a060020a036004358116906024351661079d565b60405190815260200160405180910390f35b34156103e257600080fd5b61017f600160a060020a03600435166107ca565b604051901515815260200160405180910390f35b341561041557600080fd5b61017f600160a060020a036004351660243561081a565b604051901515815260200160405180910390f35b60408051908101604052600781527f4875657948657800000000000000000000000000000000000000000000000000602082015281565b600160a060020a03338116600081815260046020908152604080832094871680845294909152808220859055909291907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259085905190815260200160405180910390a35060015b92915050565b6000545b90565b600160a060020a03831660009081526003602052604081205482901080159061053b5750600160a060020a0380851660009081526004602090815260408083203390941683529290522054829010155b80156105475750600082115b801561056c5750600160a060020a038316600090815260036020526040902054828101115b156105fb57600160a060020a0380851660008181526003602081815260408084208054899003905560048252808420338716855282528084208054899003905594881680845291905290839020805486019055917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9085905190815260200160405180910390a35060016105ff565b5060005b5b9392505050565b601281565b600160a060020a0381166000908152600360205260409020545b919050565b600254600160a060020a031681565b600154600160a060020a031681565b60408051908101604052600481527f4855455900000000000000000000000000000000000000000000000000000000602082015281565b60015460009033600160a060020a0390811691161461069e57600080fd5b506001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161781555b5b919050565b600160a060020a0333166000908152600360205260408120548290108015906106f75750600082115b801561071c5750600160a060020a038316600090815260036020526040902054828101115b1561078e57600160a060020a033381166000818152600360205260408082208054879003905592861680825290839020805486019055917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9085905190815260200160405180910390a35060016104de565b5060006104de565b5b92915050565b600160a060020a038083166000908152600460209081526040808320938516835292905220545b92915050565b60015460009033600160a060020a039081169116146107e857600080fd5b506002805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03831617905560015b5b919050565b60025460009033600160a060020a0390811691161461083857600080fd5b600160a060020a0332166000908152600360205260409020548290108015906108615750600082115b80156108865750600160a060020a038316600090815260036020526040902054828101115b1561078e57600160a060020a033281166000818152600360205260408082208054879003905592861680825290839020805486019055917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9085905190815260200160405180910390a382600160a060020a031632600160a060020a03167f88dcaca629d63d86330e97adc358b13dd0ebd703239aea96b7ea2fb331b16f4e8460405190815260200160405180910390a35060016104de565b5060006104de565b5b5b929150505600a165627a7a72305820f6df5a4e6a1b790a597bb71a949ebecd1bbf2a6144d7dc1c4cde122fffc8dc940029",
    "networks": {},
    "schema_version": "0.0.5",
    "updated_at": 1512769755963
  },

Token.contractAddress = "0x8a019b9f97d1f24b3793e5bb74667ae205d217c0";
Token.abi = Token.json.abi;
Token.tokenCon = web3.eth.contract(Token.abi).at(Token.contractAddress);
  
Token.getBalance = function(address, callback)  {
    var balance = 0;

    if(!web3.isAddress(address)) {
        callback("Not valid address",balance);
     } else {
        Token.tokenCon.balanceOf.call(address, function(error,res) {
            if(!error) {
                balance = res;
            }
            callback(error,balance);
        });
    }
  };
  




  
