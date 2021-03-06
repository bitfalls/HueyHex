
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
        LocalStore.set('subContractAddress', '0x60294111D436f0f7F467eda8A09e302f6e298964');
        LocalStore.set('tokenContractAddress', '0xf42f4fe4934db059d23c7d1676bb125c8ae88cd3');
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