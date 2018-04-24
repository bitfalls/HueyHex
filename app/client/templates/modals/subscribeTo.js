
Template['modals_subscribeTo'].onRendered(function() {
    TemplateVar.set(this,'notComplete',true);
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
        }
        else {
            Subscriptions.subscribeTo(add, function(err,result){
                if(!err) {
                    TemplateVar.set(template,'headerText', 'Success! Please allow a moment for changes to take effect.')
                    TemplateVar.set(template,'notComplete',false);
                } else {

                }
            });
            
        }
        
    },


    'click #btn-cancel': function(event, template){
        EthElements.Modal.hide();
        
    }

});