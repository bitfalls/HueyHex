
// disconnect any meteor server
if(location.host !== 'localhost:3000' 
   && location.host !== '127.0.0.1:3000' 
   && typeof MochaWeb === 'undefined')
    Meteor.disconnect();
if(web3 === undefined){
    web3Util.restart();
}

if(!LocalStore.get('currentChain'))
    LocalStore.set('currentChain', 0);

if(!LocalStore.get('etherUnit'))
    LocalStore.set('etherUnit', 'ether');

if(!LocalStore.get('nodeUrl'))
    LocalStore.set('nodeUrl', 'http://127.0.0.1:8545');

if(!LocalStore.get('ipfsUrl'))
    LocalStore.set('ipfsUrl', 'https://ipfs.io/');

if(!LocalStore.get('swarmUrl'))
    LocalStore.set('swarmUrl', 'https://swarm-gateways.net/')
    

switch(LocalStore.get('currentChain')) {
    case 0:
        LocalStore.set('subContractAddress', '0x9C3Ba9C94e3B21006f3A22E6F257f9B450e1c2dC');
        LocalStore.set('tokenContractAddress', '0x2e5253897bCa52ee7f8207DafD28154BB6Cec7F6');
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



Meteor.startup(function() {

    EthAccounts.init();
    EthBlocks.init();

    var myAccounts = EthAccounts.find().fetch();

    if(Cookie.get('TAPi18next')) {
        TAPi18n.setLanguage(Cookie.get('TAPi18next'));
    } else {
        var userLang = navigator.language || navigator.userLanguage,
        availLang = TAPi18n.getLanguages();

        // set default language
        if (_.isObject(availLang) && availLang[userLang]) {
            TAPi18n.setLanguage(userLang);
            // lang = userLang; 
        } else if (_.isObject(availLang) && availLang[userLang.substr(0,2)]) {
            TAPi18n.setLanguage(userLang.substr(0,2));
            // lang = userLang.substr(0,2);
        } else {
            TAPi18n.setLanguage('en');
            // lang = 'en';
        }
    }
        
    Session.setDefault("timeSinceBlock",0);
    Meta.setTitle("HueyHex"); 

});
