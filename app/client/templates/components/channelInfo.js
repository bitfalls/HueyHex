
var itemEnum = {
	0:"BitTorrent",
	1:"IPFS",
	2:"Swarm"
};

Template['components_channelInfo'].onRendered(function(){
	var template = this;
	this.autorun(function(){
		TemplateVar.set(template,'conAddress','');
		TemplateVar.set(template, 'title', '');
		TemplateVar.set(template, 'description', '');
		TemplateVar.set(template, 'totalSubs', '');
		TemplateVar.set(template, 'totalDonations', '');

		TemplateVar.set(template,'isLoaded',false);
		TemplateVar.set(template,'isMine', web3.eth.defaultAccount.toString().toLowerCase() == Router.current().params.channel.toString().toLowerCase());
		var address = Router.current().params.channel.toString();
		TemplateVar.set(template, 'channelAdd', address);
		Subscriptions.channelExist(Router.current().params.channel.toString(),function(err, res){
			TemplateVar.set(template, 'exist', res);
			if(res) {
				Subscriptions.getChannelContract(Router.current().params.channel.toString(),function(err,result){
                    
                    TemplateVar.set(template, 'conAddress', result);
                    Channel.getTitle(result,function(err,title) {
                        if(!err) {
                            TemplateVar.set(template, 'title', title);
                        }
                    });
                    Channel.getDescription(result,function(err ,description) {
                        if(!err)  {
                            TemplateVar.set(template, 'description', description);
                        }
					});
					Subscriptions.getTotalSubs(address, function(err,result) {
						if(!err)  {
							TemplateVar.set(template, 'totalSubs', result);
						}
					});
					Subscriptions.getTotalDonations(address,function(err,result)  {
						if(!err)  {
							var donations = 0;
							if(result > 0) {
								donations = result;
							}
							TemplateVar.set(template, 'totalDonations', result);
						}
					});
				});
			};
			TemplateVar.set(template,'isLoaded',true);

		});
	});
	  
});


Template['components_channelInfo'].events({

});


Template['components_channelInfo'].helpers({
    
    'getChannelTitle': function() {

    },

	'fromWei': function(weiValue, type){
		return web3.fromWei(weiValue, type).toString(10);
	},

	'isMine': function(){
		return TemplateVar.get('isMine');
	},

	'showDescription': function(){
		return (Router.current().params.itemId === undefined);
	}

});
