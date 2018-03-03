/**
Template Controllers

@module Templates
*/

/**
The settingsContent template

@class [template] components_settingsContent
@constructor
*/

Template['components_settingsContent'].onRendered(function() {
    var template = this;
    console.log('here',  LocalStore.get('currentChain'));
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
});

Template['components_settingsContent'].events({
    
    'click #save_btn': function(event, template){
        var rpcUrl = template.find("#rpcUrl").value;
        var ipfsUrl = template.find("#ipfsUrl").value;
        var chain = template.find("#blockchain").value;
        if(rpcUrl && ipfsUrl && chain) {
            LocalStore.set('nodeUrl',rpcUrl);
            LocalStore.set('ipfsUrl', ipfsUrl);
            LocalStore.set('currentChain', chain);
            switch(LocalStore.get('currentChain')) {
                case 1:
                    LocalStore.set('subContractAddress', '0x7213f650be9ee1e28067241eb18856c149642395');
                    break;
                case 2:
                    LocalStore.set('subContractAddress', '0xe2d01cc1346618790be63332e862a9bc33697ec3');
                    break;
                // case n:
                //     code block
                //     break;
                // default:
                //     code block
            } 
            console.log(chain);
            GlobalNotification.success({
                content: "Settings Updated - Please Refresh Browser",
                duration: 4
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

