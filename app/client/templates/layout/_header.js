
Template['layout_header'].onCreated(function(){
    var template = this;
    this.autorun(function(){
        web3.eth.getAccounts(function(error, result) {
            if(!error){
                web3.eth.defaultAccount = result[0];
                TemplateVar.set(template,'account',web3.eth.defaultAccount);
            }
            web3.eth.getSyncing(function(error, sync){
                if(!error) {
                    if(sync === true) {
                        web3.reset(true);
                        TemplateVar.set(template,'status','Syncing');
                    } else if(sync) {
                        TemplateVar.set(template,'status','Syncing');
                    } else {
                        if(web3.isConnected()) {
                            TemplateVar.set(template,'status','Connected');
                        } else {
                            TemplateVar.set(template,'status','Not Connected')
                        }
                    }
                }
                else {
                    TemplateVar.set(template,'status','Not Connected')
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
        Session.setDefault("currentBlock",EthBlocks.latest.number);
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
    },

    'isSyncing': function(){

    }

});