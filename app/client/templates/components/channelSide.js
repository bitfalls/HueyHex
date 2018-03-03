/**
Template Controllers

@module Templates
*/

/**
The channelSide template

@class [template] components_channelSide
@constructor
*/

Template['components_channelSide'].onRendered(function() {
    console.log('this',Router.current().params.channel);

});

// when the template is destroyed
Template['components_channelSide'].onDestroyed(function() {

});

Template['components_channelSide'].helpers({

    'getSubs': function(){
        return TemplateVar.get("subs");
    },   
    'isMine': function(){
        return web3.eth.defaultAccount.toString().toLowerCase() == Router.current().params.channel.toString().toLowerCase();
    }
    
});

/**
	On "search" click
	
	@event (click .btn-search)
*/
    
Template['components_channelSide'].events({
    "click #btn-donate": function(event, template) {
        EthElements.Modal.question({
            template: 'modals_coming'
        })
    },

    "click #btn-torrent": function(event, template) {
        var add = Router.current().params.channel.toString();
        Router.go('channelWithId',{channel: add, itemId:0},{});//query: 'channel='+add
    },

    "click #btn-ipfs": function(event, template) {
        var add = Router.current().params.channel.toString();
        Router.go('channelWithId',{channel: add, itemId:1},{});//query: 'channel='+add
    },

    "click #btn-swarm": function(event, template) {
        var add = Router.current().params.channel.toString();
        Router.go('channelWithId',{channel: add, itemId:2},{});//query: 'channel='+add
    },

    "click #btn-subscribe": function(event, template) {
        EthElements.Modal.question({
            template: 'modals_subscribeTo'
        })

    },
    "click #btn-add": function(event, template)  {
        Router.go('addItem');
    }
});

