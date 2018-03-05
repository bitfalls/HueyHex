
Template['layout_header'].onCreated(function(){
    var template = this;
    console.log('reafdsafdfads');
    this.autorun(function(){

        web3.eth.getSyncing(function(error, sync){
            console.log('test');
            console.log(error, sync);
            if(!error) {
                if(sync === true) {
                    web3.reset(true);
                    TemplateVar.set(template,'status','Syncing');
                } else if(sync) {
                    console.log(sync.currentBlock);
                    TemplateVar.set(template,'status','Syncing');
                } else {
                    if(web3.isConnected()) {
                        TemplateVar.set(template,'status','Connected');
                        TemplateVar.set(template,'account', web3.eth.defaultAccount);
                    } else {
                        TemplateVar.set(template,'status','Not Connected')
                    }
                }
            }
        });
    });


});


Template['layout_header'].onRendered(function(){
    var template = this;
    this.autorun(function(){

        web3.eth.isSyncing(function(error, sync){
            console.log(error, sync);
            if(!error) {
                if(sync === true) {
                    web3.reset(true);
                    TemplateVar.set(template,'status','Syncing');
                } else if(sync) {
                    console.log(sync.currentBlock);
                    TemplateVar.set(template,'status','Syncing');
                } else {
                    if(web3.isConnected()) {
                        TemplateVar.set(template,'status','Connected');
                    } else {
                        TemplateVar.set(template,'status','Not Connected')
                    }
                }
            }
        });
    });

});

Template['layout_header'].helpers({

    /**
    Calculates the total balance of all accounts + wallets.

    @method (totalBalance)
    @return {String}
    */
    'totalBalance': function(){
        var accounts = EthAccounts.find({}).fetch();
        var wallets = Wallets.find({owners: {$in: _.pluck(accounts, 'address')}}).fetch();

        var balance = _.reduce(_.pluck(_.union(accounts, wallets), 'balance'), function(memo, num){ return memo + Number(num); }, 0);

        updateMistBadge();

        return balance;
    },


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

    },

    'myChannelPath': function(){
        return "channel/" + web3.eth.defaultAccount;
    }

});