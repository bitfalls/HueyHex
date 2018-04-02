
Template['components_subscriptions'].onRendered(function() {
    var template = this;
    var subs = new Array;
    this.autorun(function(){
        web3.eth.getAccounts(function(error, result) {
            if(!error){
                web3.eth.defaultAccount = result[0];
            Subscriptions.getChannels(function(err, results){
                if(!err) {
                    TemplateVar.set(template,'subs',results);
                }
                else {
                }
            });
            }
        });
    });
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

