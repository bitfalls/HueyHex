/**
Template Controllers

@module Templates
*/

/**
The channelInfo template

@class [template] components_channelInfo
@constructor
*/
var itemEnum = {
	0:"BitTorrent",
	1:"IPFS",
	2:"Swarm"
};

Template['components_channelInfo'].onRendered(function(){
	var template = this;
	this.autorun(function(){

		//console.log("ttttt" +web3.eth.defaultAccount);
		TemplateVar.set(template,'isMine', web3.eth.defaultAccount.toString().toLowerCase() == Router.current().params.channel.toString().toLowerCase());
		//console.log("testtest" +TemplateVar.get(template,'isMine'));
		var address = Router.current().params.channel.toString();
		TemplateVar.set(template, 'channelAdd', address);
		Subscriptions.channelExist(Router.current().params.channel.toString(),function(err, res){
			TemplateVar.set(template, 'exist', res);
			console.log(res);
			if(res) {
				Subscriptions.getChannelContract(Router.current().params.channel.toString(),function(err,result){
                    
                    TemplateVar.set(template, 'conAddress', result);
                    console.log("contractadd-" + result);
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
						console.log(err,result);
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

		});
	});
	  
});

// template events
Template['components_channelInfo'].events({
});

// template handlebar helper methods
Template['components_channelInfo'].helpers({
	/**
    Convert Wei to Ether Values

    @method (fromWei)
	*/
    
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
