
Template['components_subscriptions'].onRendered(function() {
    var template = this;
    var subs = new Array;

    //had to create 2 autoruns as I was seeing an issue using MIST.
    this.autorun(function(){
        web3.eth.getAccounts(function(error, result) {
            if(!error){
                web3.eth.defaultAccount = result[0];
                //console.log('here');
                Subscriptions.getChannels(function(err, results){
                    var obj = {
                        owner: "0x5f1fc3f94c2b13eb27814701e76c78b44ee209c5",
                        description: "desc",
                        trunc: "HueyHex"
                    };
                    var channels = [obj];
                    console.log(results);
                    var subs = channels.concat(results);
                    TemplateVar.set(template,'subs',subs);
                    console.log(subs);
                });
            }
        });

    });
    // this.autorun(function(){
    //     web3.eth.defaultAccount;
    //     Subscriptions.getChannels(function(err, results){
    //         if(!err) {
    //             TemplateVar.set(template,'subs',results);
    //         } else {

    //         }
    //     });
    // });
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

