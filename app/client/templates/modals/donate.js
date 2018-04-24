
Template['modals_donate'].onRendered(function(){


});


Template['modals_donate'].helpers({
    'channel': function(){
        return Router.current().params.channel.toString();
    }
});

Template['modals_donate'].events({
    'focus textarea': function(e, template){
        
    },

    'click #btn-donate': function(event, template){
        var amount = template.find('#amount').value;
        var channel = Router.current().params.channel.toString();
        if(amount > 0) {
            Subscriptions.donateTo(channel,amount,function(error, result){
                if(!error && result) {
                    GlobalNotification.success({
                        content: "Successfully donated " + amount + " Huey to channel: " + channel,
                        duration: 4
                    });
                    EthElements.Modal.hide();
                }
            }
        );
    }
    else {
        GlobalNotification.warning({
            content: "Please enter a valid amount",
            duration: 4
        });

    }
           
    
    }

});