/**
The template to display the ABI.
@class [template] views_modals_interface
@constructor
*/
Template['modals_subscribeTo'].onRendered(function() {
    TemplateVar.set(this, 'headerText', 'Do you want to subscribe to this Channel?');
});



Template['modals_subscribeTo'].helpers({
    
    });
    
    Template['modals_subscribeTo'].events({
        'focus textarea': function(e, template){
            
            
        },
    
        // 'change .dapp-address-input input': function(e,template) {
        //     var button = template.find("#btn-goto");
        //     button.hide = true;
            
        //     var value = TemplateVar.getFrom(e.currentTarget, 'value');
        //     console.log(value);
        //     if (value != "" && value != undefined) {
        //         button.hide = false;
        //     }
        // },
    
    
        'click #btn-subscribe': function(event, template){
            //var add = template.find("#addr").value;
            var add = Router.current().params.channel.toString();
            if(add == "" || add == undefined || add == null) {
                console.log("please enter valid address"); //add message
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