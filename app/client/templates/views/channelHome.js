/**
Template Controllers

@module Templates
*/

/**
The channelHome template

@class [template] views_channelHome
@constructor
*/

Template['views_channelHome'].onRendered(function() {
    
    var template = this;
	this.autorun(function(){
		//this.data.channel = chan;
		console.log(Router.current().params.itemId);
		web3.eth.defaultAccount = web3.eth.accounts[0];
		TemplateVar.set(template,'isMine', web3.eth.defaultAccount == Router.current().params.channel.toString());
		console.log(TemplateVar.get(template,'isMine'));
		TemplateVar.set(template, 'channelAdd', Router.current().params.channel.toString());
		//TemplateVar.set(template, 'itemNum', Router.current().params.itemId.toString());
		// TemplateVar.set(template, 'itemName', itemEnum[TemplateVar.get(template)])

		Subscriptions.channelExist(Router.current().params.channel.toString(),function(e,res){
			TemplateVar.set(template, 'exist', res);
			console.log(res);
			if(res) {
				Subscriptions.getChannelContract(Router.current().params.channel.toString(),function(e,res){
					TemplateVar.set(template, 'conAddress', res);
					console.log("contractadd-" + res);
				});

			}

		});
        
    
    });
});
    
Template['views_channelHome'].helpers({
    /**
    Get the name
    
    @method (name)
    */
    
    'name': function(){
        return this.name;
    }
});
    
Template['views_channelHome'].onCreated(function(){
    // /Meta.setSuffix(TAPi18n.__("dapp.view1.title"));
});
    