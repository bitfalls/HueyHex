
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
    
Template['components_channelSide'].events({
    "click #btn-donate": function(event, template) {
        EthElements.Modal.question({
            template: 'modals_coming'
        })
    },

    "click #btn-torrent": function(event, template) {
        var add = Router.current().params.channel.toString();
        Router.go('channelWithId',{channel: add, itemId:0},{});
    },

    "click #btn-ipfs": function(event, template) {
        var add = Router.current().params.channel.toString();
        Router.go('channelWithId',{channel: add, itemId:1},{});
    },

    "click #btn-swarm": function(event, template) {
        var add = Router.current().params.channel.toString();
        Router.go('channelWithId',{channel: add, itemId:2},{});
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

