
var itemEnum = {
	0:"BitTorrent",
	1:"IPFS",
	2:"Swarm"
};
var itemCount = 3;

var setTemplateVars = function(template,channel,itemNum) {
	TemplateVar.set(template,'isMine', web3.eth.defaultAccount == channel);
	TemplateVar.set(template, 'channelAdd', channel);
	TemplateVar.set(template, 'itemNum', itemNum);
	TemplateVar.set(template,'isBittorrent', itemNum == 0);
	TemplateVar.set(template,'isIPFS', itemNum == 1);
	TemplateVar.set(template,'isSwarm', itemNum == 2);
	TemplateVar.set(template, 'itemName', itemEnum[itemNum]);
	var allItems = TemplateVar.get(template,'allItems');
	TemplateVar.set(template,'items',allItems[itemNum]);
	TemplateVar.set(template,'isLoaded',true);
};

var updateItems = function(template,itemNum) {

};

Template['components_channelContent'].onRendered(function(){
	this.autorun(function(){
		var template = this;
		var itemId = Router.current().params.itemId;
		var channel = Router.current().params.channel.toString();
		TemplateVar.set(template,'isLoaded',false);
		if(!TemplateVar.get(template,'allItems')) {
			Subscriptions.channelExist(Router.current().params.channel.toString(),function(e,res){
				TemplateVar.set(template, 'exist', res);
				if(res) {
					Subscriptions.getChannelContract(channel,function(e,res){
						TemplateVar.set(template, 'conAddress', res);
						var address = res;
						Channel.GetAllItems(address,function(err,results) {
							if(!err){
								TemplateVar.set(template, 'allItems', results);
								setTemplateVars(template,channel,itemId);
							}

						});

					});

				}

			});
		} else {
			setTemplateVars(template,channel,itemId);
		}
	});
});


Template['components_channelContent'].helpers({

	'fromWei': function(weiValue, type){
		return web3.fromWei(weiValue, type).toString(10);
	},
	
	'ipfsUrl': function()  {
		return (LocalStore.get('ipfsUrl'));
	},

	'swarmUrl': function()  {
		return LocalStore.get('swarmUrl');
	},

	'linkName': function() {
		var text = "";
		switch(TemplateVar.get('itemNum')) {
			case "0":
				text = "Magnet Link";
				break;
			case "1":
				text = "IPFS Link";
				break;
			case "2":
				text = "Swarm Link";
				break;
		} 
		return text;
	}
	
});
