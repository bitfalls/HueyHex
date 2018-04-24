

Template['views_channelHome'].onRendered(function() {
    
    var template = this;
	this.autorun(function(){
		TemplateVar.set(template,'isMine', web3.eth.defaultAccount == Router.current().params.channel.toString());
		TemplateVar.set(template, 'channelAdd', Router.current().params.channel.toString());
		Subscriptions.channelExist(Router.current().params.channel.toString(),function(e,res){
			TemplateVar.set(template, 'exist', res);

			if(res) {
				Subscriptions.getChannelContract(Router.current().params.channel.toString(),function(e,res){
					TemplateVar.set(template, 'conAddress', res);
				});
			}
		});
        
    
    });
});
    
Template['views_channelHome'].helpers({

    'name': function(){
        return this.name;
    }
});
    
Template['views_channelHome'].onCreated(function(){
});
    