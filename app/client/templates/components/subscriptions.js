/**
Template Controllers

@module Templates
*/

/**
The subscriptions template

@class [template] components_subscriptions
@constructor
*/

Template['components_subscriptions'].onRendered(function() {
    var template = this;
    //web3.eth.defaultAccount = web3.eth.accounts[0];
    //console.log("here" + web3.eth.defaultAccount);
    //console.log(Router.current().params.channel);
    var subs = new Array;
    this.autorun(function(){
        Subscriptions.getChannels(function(err, results){
            if(!err) {
                TemplateVar.set(template,'subs',results);
            }
            else {
                console.log(err);
            }
        });
    })
});

Template['components_subscriptions'].helpers({

    'getSubs': function(){
        return TemplateVar.get('subs');
    }   
    
});
    
Template['components_subscriptions'].events({
    "click #btn-search": function(event, template) {
        EthElements.Modal.question({
            template: 'modals_search'
        })
    }
});
