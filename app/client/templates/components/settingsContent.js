
Template['components_settingsContent'].onRendered(function() {
    var template = this;
    template.find("#blockchain").value = LocalStore.get('currentChain');
});

Template['components_settingsContent'].onDestroyed(function() {

});

Template['components_settingsContent'].helpers({
    'currentNode': function(){
		return LocalStore.get('nodeUrl');
    },
    'currentIpfs': function(){
        return LocalStore.get('ipfsUrl');
    },
    'currentSwarm': function(){
        return LocalStore.get('swarmUrl');
    }
});

Template['components_settingsContent'].events({
    
    'click #save_btn': function(event, template){
        var rpcUrl = template.find("#rpcUrl").value;
        var ipfsUrl = template.find("#ipfsUrl").value;
        var swarmUrl = template.find("#swarmUrl").value;
        var chain = template.find("#blockchain").value;
        if(rpcUrl && ipfsUrl && chain) {
            LocalStore.set('nodeUrl',rpcUrl);
            LocalStore.set('ipfsUrl', ipfsUrl);
            LocalStore.set('currentChain', chain);
            LocalStore.set('swarmUrl', swarmUrl);
            switch(LocalStore.get('currentChain')) {
                case 0:
                    LocalStore.set('subContractAddress', '0x9C3Ba9C94e3B21006f3A22E6F257f9B450e1c2dC');
                    LocalStore.set('tokenContractAddress', '0x2e5253897bCa52ee7f8207DafD28154BB6Cec7F6');
                    break;
                case 1:
                    LocalStore.set('subContractAddress', '0xe2d01cc1346618790be63332e862a9bc33697ec3');
                    break;
                // case n:
                //     code block
                //     break;
                // default:
                //     code block
            } 
            GlobalNotification.success({
                content: "Settings Updated",
                duration: 5
            });
            web3Util.restart(function(result){
                Router.go("home");
            });
            
        }
        else if(!rpcUrl) {
            GlobalNotification.warning({
                content: "Please enter a RPC URL",
                duration: 4
            });
        }
        else if(!ipfsUrl) {
            GlobalNotification.warning({
                content: "Please enter a IPFS URLs",
                duration: 4
            });
        }
    }
});

