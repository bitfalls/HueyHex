
/**
Template Controllers

@module Templates
*/

/**
The header template

@class [template] layout_header
@constructor
*/

Template['layout_header'].onCreated(function(){
    var template = this;
    console.log('reafdsafdfads');
    this.autorun(function(){

        web3.eth.getSyncing(function(error, sync){
            console.log('test');
            console.log(error, sync);
            if(!error) {
                // stop all app activity
                if(sync === true) {
                // we use `true`, so it stops all filters, but not the web3.eth.syncing polling
                    web3.reset(true);
                    
                    TemplateVar.set(template,'status','Syncing');
                // show sync info
                } else if(sync) {
                    console.log(sync.currentBlock);
                    TemplateVar.set(template,'status','Syncing');
                    
                // re-gain app operation
                } else {
                    // run your app init function...
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
                // stop all app activity
                if(sync === true) {
                // we use `true`, so it stops all filters, but not the web3.eth.syncing polling
                    web3.reset(true);
                    
                    TemplateVar.set(template,'status','Syncing');
                // show sync info
                } else if(sync) {
                    console.log(sync.currentBlock);
                    TemplateVar.set(template,'status','Syncing');
                    
                // re-gain app operation
                } else {
                    // run your app init function...
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
    /**
    Formats the last block number

    @method (formattedBlockNumber)
    @return {String}
    */
    'formattedBlockNumber': function() {
        Helpers.rerun["10s"].tick();
        Session.setDefault("currentBlock",EthBlocks.latest.number);
        return EthBlocks.latest.number;
    },
    /**
    Gets the time since the last block

    @method (timeSinceBlock)
    */
    'timeSinceBlock': function () {
        
        if (EthBlocks.latest.timestamp == 0 
            || typeof EthBlocks.latest.timestamp == 'undefined')   
            return false;

        var timeSince = moment(EthBlocks.latest.timestamp, "X");
        var now = moment();
        var diff = now.diff(timeSince, "seconds");
        //Helpers.rerun["1s"].tick();
        //if (diff > 60 * 5) {
            //Helpers.rerun["10s"].tick();
        //    return '<span class="red">' + timeSince.fromNow(true) + '</span>';
        // } else if (diff > 60) {
        //     Helpers.rerun["10s"].tick();
        //     return timeSince.fromNow(true);
        // } else if (diff < 2) {
        //     Helpers.rerun["1s"].tick();
        //     return ''
        // } else {
        Helpers.rerun["1s"].tick();
        return diff + "s ";
        // }
        
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