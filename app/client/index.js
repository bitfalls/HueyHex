
// disconnect any meteor server
if(location.host !== 'localhost:3000' 
   && location.host !== '127.0.0.1:3000' 
   && typeof MochaWeb === 'undefined')
    Meteor.disconnect();

//console.log(LocalStore.get('subsContract'));
// Set the default unit to ether
if(!LocalStore.get('currentChain'))
    LocalStore.set('currentChain', 2);

if(!LocalStore.get('etherUnit'))
    LocalStore.set('etherUnit', 'ether');

if(!LocalStore.get('nodeUrl'))
    LocalStore.set('nodeUrl', 'http://127.0.0.1:8545');

if(!LocalStore.get('ipfsUrl'))
    LocalStore.set('ipfsUrl', 'http://127.0.0.1:8080');

if(!LocalStore.get('swarmUrl'))
    LocalStore.set('swarmUrl', 'http://127.0.0.1:8500')

switch(LocalStore.get('currentChain')) {
    case 1:
        LocalStore.set('subContractAddress', '0x7213f650be9ee1e28067241eb18856c149642395');
        LocalStore.set('tokenContractAddres', '');
        break;
    case 2:
        LocalStore.set('subContractAddress', '0xe2d01cc1346618790be63332e862a9bc33697ec3');
        LocalStore.set('tokenContractAddres', '');
        break;
    // case n:
    //     code block
    //     break;
    // default:
    //     code block
} 

// Set Session default values for components
if (Meteor.isClient) {
	Session.setDefault('balance', '0');
}


Meteor.startup(function() {
    
    


    
    console.log(web3.eth);
    // Setup EthAccounts

    EthAccounts.init();
    EthBlocks.init();
    //web3.eth.defaultAccount = web3.eth.accounts[0];
    //LocalStore.set('subsContract', "0x5ef8e25f88535bcb7522a76bbf4fe985d948765f");
    //LocalStore.set('contract', web3.eth.contract((Helpers.json).abi).at('0x5ef8e25f88535bcb7522a76bbf4fe985d948765f'));
    Session.setDefault("channel", "");

    // SET default language
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
        
    Session.setDefault("currentAccount", web3.eth.coinbase);
    Session.setDefault("timeSinceBlock",0);

	Meta.setTitle(TAPi18n.__("dapp.app.title"));
});
