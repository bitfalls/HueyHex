Template['components_browseChannels'].onRendered(function(){
    var template = this;
	this.autorun(function(){
        var account = web3.eth.defaultAccount;
        TemplateVar.set(template,'account', account);
        Subscriptions.getChannelCount(function(err, result){
            console.log('count', result);
        });
        Subscriptions.getAllChannels(function(err, result){
            console.log('eee', result);
        });
    });
    
});

Template['components_browseChannels'].events({

});


Template['components_browseChannels'].helpers({
	
});
