
Template['modals_search'].helpers({

});

Template['modals_search'].events({
    'focus textarea': function(e, template){
        
        
    },

    'click #btn-goto': function(event, template){

        var add = TemplateVar.getFrom('.dapp-address-input', 'value');
        if(add == "" || add == undefined || add == null) {
        }
        else {
            Router.go('channel',{channel: add.toLowerCase()},{});
            Session.setDefault("channel", add);
            EthElements.Modal.hide();
        }
    }

})