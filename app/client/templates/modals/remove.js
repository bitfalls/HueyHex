
Template['modals_remove'].onRendered(function(){


});


Template['modals_remove'].helpers({

});

Template['modals_remove'].events({

    'click #btn-remove': function(event, template){
        var itemHash = template.data.itemHash;
        Channel.RemoveItem(template.data.address, template.data.itemHash, template.data.itemId, function(err,result){
            if(!err && result) {
                GlobalNotification.success({
                    content: "Successfully removed item!",
                    duration: 4
                });
                EthElements.Modal.hide();
            }
            else {
                GlobalNotification.error({
                    content: "Error removing Item: "+ err,
                    duration:4
                });
            }

        });
    },

    'click #btn-cancel': function(event, template)  {
        EthElements.Modal.hide();

    }


});