
var itemEnum = {
	0:"BitTorrent",
	1:"IPFS",
	2:"Swarm"
};
var itemCount = 3;


// when the template is rendered
Template['components_channelContent'].onRendered(function(){
	var template = this;
	this.autorun(function(){
		//this.data.channel = chan;
		console.log(Router.current().params.itemId);
		TemplateVar.set(template,'isMine', web3.eth.defaultAccount == Router.current().params.channel.toString());
		console.log(TemplateVar.get(template,'isMine'));
		TemplateVar.set(template, 'channelAdd', Router.current().params.channel.toString());
		TemplateVar.set(template, 'itemNum', Router.current().params.itemId.toString());
		TemplateVar.set(template, 'itemName', itemEnum[TemplateVar.get(template, 'itemNum')]);
		Subscriptions.channelExist(Router.current().params.channel.toString(),function(e,res){
			TemplateVar.set(template, 'exist', res);
			console.log(res);
			if(res) {
				Subscriptions.getChannelContract(Router.current().params.channel.toString(),function(e,res){
					TemplateVar.set(template, 'conAddress', res);
					var address = res;
					console.log("contractadd-" + res);
					Channel.GetAllItems(address,function(err,results) {
						console.log('brian',err,results);
						if(!err){
							console.log('brian',results);
							TemplateVar.set(template, 'allItems', results);
							for (var i = 0; i < results.length; i++)  {
								TemplateVar.set(template, i, results[i]);
								console.log('ipfs',results[i]);
								TemplateVar.set(template,itemEnum[i],results[i]);
							}
							console.log('here',TemplateVar.get(template,itemEnum[0]));
						}

					});

				});

			}

		});
	});
});

// template events
Template['components_channelContent'].events({
	'click #addItemBtn': function(event, template){
        Router.go('addItem');
    }
});

Template['components_channelContent'].helpers({

	'fromWei': function(weiValue, type){
		return web3.fromWei(weiValue, type).toString(10);
	},

	'isMine': function(){
		return TemplateVar.get('isMine');
	},
	
	'isBittorrent': function() {
		return (TemplateVar.get('itemNum') == 0);
	},

	'isIPFS': function()  {
		return (TemplateVar.get('itemNum') == 1);
	},

	'isSwarm': function()  {
		return (TemplateVar.get('itemNum') == 2);
	},

	'linkName': function() {
		var text = "";
		console.log('linkname', TemplateVar.get('itemNum'));
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
		console.log('text', text);
		return text;
	},

	'items': function(){
		var items = new Array();
		items = TemplateVar.get(TemplateVar.get('itemNum'));
		console.log('test', items);
		return items;
	},
	
});
