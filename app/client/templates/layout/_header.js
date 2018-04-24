
Template['layout_header'].onCreated(function(){
    var template = this;
    this.autorun(function(){
        web3.eth.getAccounts(function(error, result) {
            if(!error && result.length > 0){
                web3.eth.defaultAccount = result[0];
                TemplateVar.set(template,'accountDisplay',web3.eth.defaultAccount.substring(0,12)+"...");
                TemplateVar.set(template, 'account', web3.eth.defaultAccount);
                GlobalNotification.success({
                    content: "Account found - " + web3.eth.defaultAccount,
                    duration: 5
                });
                
            } else {
                
                TemplateVar.set(template,'accountDisplay',"No Account Found");
                GlobalNotification.error({
                    content: "No Accounts Found",
                    duration: 5
                });
            }
            GlobalNotification.warning({
                content: "WARNING - HUEYHEX IS IN BETA",
                duration: 8

            });
            web3.eth.getSyncing(function(error, sync){
                if(!error) {
                    if(sync) {
                        web3.reset(true);
                        TemplateVar.set(template,'status','Syncing');
                    } else {
                        if(web3.isConnected()) {
                            TemplateVar.set(template,'status','Connected');
                            GlobalNotification.success({
                                content: "Web3 provider found",
                                duration: 5
                            });

                        } else {
                            TemplateVar.set(template,'status','Not Connected')
                            GlobalNotification.error({
                                content: "No Web3 provider found",
                                duration: 5
                            });
                        }
                    }
                }
                else {
                    TemplateVar.set(template,'status','Not Connected')
                    GlobalNotification.error({
                        content: "No Web3 provider found!",
                        duration: 5
                    });
                }
            });
        });
    });



});


Template['layout_header'].onRendered(function(){
    var template = this;
});

Template['layout_header'].helpers({

    'formattedBlockNumber': function() {
        Helpers.rerun["10s"].tick();
        return EthBlocks.latest.number;
    },

    'timeSinceBlock': function () {
        
        if (EthBlocks.latest.timestamp == 0 
            || typeof EthBlocks.latest.timestamp == 'undefined')   
            return false;

        var timeSince = moment(EthBlocks.latest.timestamp, "X");
        var now = moment();
        var diff = now.diff(timeSince, "seconds");
        Helpers.rerun["1s"].tick();
        return diff + "s ";
        
    },

	'peerCount': function(){
        Helpers.rerun["10s"].tick();
		web3.net.getPeerCount(function(error, result) {
            Session.set("peers",result);
        })
        return Session.get("peers");
    }

});