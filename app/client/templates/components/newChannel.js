
Template['components_newChannel'].onRendered(function() {

});

Template['components_newChannel'].onDestroyed(function() {

});

Template['components_newChannel'].helpers({
    
});

Template['components_newChannel'].events({
    'click #deploy_btn': function(event, template){
        TemplateVar.set('status', 'Creating Channel Contract..');
        TemplateVar.set('complete', false);
        var error = false;
        var channelName = template.find("#channelName").value;
        if(!channelName) {
            GlobalNotification.warning({
                content: "Please enter a Channel Name.",
                duration: 3
            });
            error = true;
        }

        var channelDescription = template.find("#channelDescription").value;
        if(!channelDescription) {
            GlobalNotification.warning({
                content: "Please enter a Channel Description",
                duration: 3
            });
            error = true;
        }

        if(!error) {
            EthElements.Modal.show({
                template: 'modals_deploy',
                closeable: false
            })
            var status = "";
            Channel.deployContract(channelName,channelDescription,function(err,transHash,transAddr) {
                if(transHash && !transAddr) {
                    status = "Contract Deploying... Please Wait... \n This may take several minutes, you will be prompted with a second transaction to register the channel."
                    TemplateVar.set(template,'status', status);
                }
                else if(transAddr)  {
                    status = "Contract Deployed to address " + transAddr + ", Registering Contract...";
                    TemplateVar.set(template,'status', status);
                    Subscriptions.registerChannel(transAddr,function(err,result) {
                        if(!err) {
                            TemplateVar.set(template,'complete',true);

                        }
                    })
                }
            });
        }
    },




});
