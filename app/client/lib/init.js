
// disconnect any meteor server
if(location.host !== 'localhost:3000' 
   && location.host !== '127.0.0.1:3000' 
   && typeof MochaWeb === 'undefined')
    Meteor.disconnect();
if(web3 === undefined){
    web3Util.restart();
}


if(!LocalStore.get('etherUnit'))
    LocalStore.set('etherUnit', 'ether');

if(!LocalStore.get('nodeUrl'))
    LocalStore.set('nodeUrl', 'http://127.0.0.1:8545');

if(!LocalStore.get('ipfsUrl'))
    LocalStore.set('ipfsUrl', 'https://ipfs.io/');

if(!LocalStore.get('swarmUrl'))
    LocalStore.set('swarmUrl', 'https://swarm-gateways.net/')
    
if(!LocalStore.get('currentChain'))
    LocalStore.set('currentChain', 0);
    
switch(LocalStore.get('currentChain')) {
    case 0:
        LocalStore.set('subContractAddress', '0x309a5799A5937ace8258D61F1F8d60E971310700');
        LocalStore.set('tokenContractAddress', '0x39a983fAe17424584B411cFCBaBAA92b8F359879');
        break;
    case 1:
        LocalStore.set('subContractAddress', '0xe2d01cc1346618790be63332e862a9bc33697ec3');
        LocalStore.set('tokenContractAddress', '');
        break;
    // case n:
    //     code block
    //     break;
    // default:
    //     code block
} 