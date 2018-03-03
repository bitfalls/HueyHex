/**
The template to display the ABI.
@class [template] views_modals_interface
@constructor
*/

Template['modals_search'].helpers({

});

Template['modals_search'].events({
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


    'click #btn-goto': function(event, template){
        //var add = template.find("#addr").value;
        var add = TemplateVar.getFrom('.dapp-address-input', 'value');
        if(add == "" || add == undefined || add == null) {
            console.log("please enter valid address"); //add message
        }
        else {
            Router.go('channel',{channel: add.toLowerCase()},{});//query: 'channel='+add
            Session.setDefault("channel", add);
            EthElements.Modal.hide();
        }
        
    }

})