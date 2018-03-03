/**
Template Controllers

@module Templates
*/

/**
The newChannel template

@class [template] components_newChannel
@constructor
*/

Template['components_newChannel'].onRendered(function() {

});

Template['components_newChannel'].onDestroyed(function() {

});

Template['components_newChannel'].helpers({
    
});

Template['components_newChannel'].events({
    'click #deploy_btn': function(event, template){
        //var add = template.find("#addr").value;
        TemplateVar.set('status', 'Creating Channel Contract..');
        TemplateVar.set('complete', false);
        var error = false;
        //console.log(template.find("#channelName").value);
        var channelName = template.find("#channelName").value;
        if(!channelName) {
            GlobalNotification.warning({
                content: "Please enter a Channel Name.",
                duration: 3
            });
            error = true;
        }

        //console.log(template.find("#channelDescription").value);
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
                console.log('here number 2', transAddr);
                //TemplateVar.set('deployed', false);
                if(transHash && !transAddr) {
                    //console.log('here0',transHash, transAddr);
                    status = "Contract Deploying... Please Wait..."
                    TemplateVar.set(template,'status', status);
                    //console.log(TemplateVar.get(template,'status'));
                }
                else if(transAddr)  {
                    console.log('here3',transHash, transAddr);
                    status = "Contract Deployed to address " + transAddr + ", Registering Contract...";
                    TemplateVar.set(template,'status', status);
                    Subscriptions.registerChannel(transAddr,function(err,result) {
                        //console.log(result);
                        if(!err) {
                            TemplateVar.set(template,'complete',true);

                        }
                    })
                }
            });
        }
    }
});
