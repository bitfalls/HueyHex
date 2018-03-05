
Template['modals_search'].helpers({

});

Template['modals_search'].events({
    'focus textarea': function(e, template){
        
        
    },

    'click #btn-goto': function(event, template){

        var add = TemplateVar.getFrom('.dapp-address-input', 'value');
        if(add == "" || add == undefined || add == null) {
            console.log("please enter valid address"); 
        }
        else {
            Router.go('channel',{channel: add.toLowerCase()},{});
            Session.setDefault("channel", add);
            EthElements.Modal.hide();
        }
    }

})