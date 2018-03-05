
Template['modals_subscribeTo'].onRendered(function() {
    TemplateVar.set(this, 'headerText', 'Do you want to subscribe to this Channel?');
});

Template['modals_subscribeTo'].helpers({
    
});
    
Template['modals_subscribeTo'].events({
    'focus textarea': function(e, template){
        
        
    },

    'click #btn-subscribe': function(event, template){

        var add = Router.current().params.channel.toString();
        if(add == "" || add == undefined || add == null) {
            console.log("please enter valid address"); 
        }
        else {
            Subscriptions.subscribeTo(add, function(err,result){
                console.log('here');
                if(!err) {
                    console.log('here');
                    TemplateVar.set(template,'headerText', 'Success! Please allow a moment for changes to take effect.')
                    console.log(result);
                } else {
                    console.log('here1');
                    console.log(err);
                }
            });
            
        }
        
    },


    'click #btn-cancel': function(event, template){
        EthElements.Modal.hide();
        
    }

});