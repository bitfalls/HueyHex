/**
Template Controllers

@module Templates
*/

/**
The channelData template

@class [template] components_channelData
@constructor
*/



// when the template is rendered
Template['components_addItemContent'].onRendered(function(){
	
    var template = this;
	this.autorun(function(){
        var account = web3.eth.defaultAccount;
        console.log("fdsafdsafdsa"+account)
        TemplateVar.set(template,'account', account);
        web3.eth.getBalance(account, function(err, result){
            var ethVal = web3.fromWei(result, "Ether");
            TemplateVar.set(template, 'balance' ,ethVal);
        });
    });
	
});

// template events
Template['components_addItemContent'].events({
    'click #addItemBtn': function(event, template){
        //var add = template.find("#addr").value;
        var error = false;
        console.log(template.find("#itemName").value);
        var itemName = template.find("#itemName").value;
        if(!itemName) {
            GlobalNotification.warning({
                content: "Please enter an Item Name.",
                duration: 3
            });
            error = true;
        }
        var itemHash = template.find("#itemLink").value;
        if(!itemHash) {
            GlobalNotification.warning({
                content: "Please enter Item Link.",
                duration: 3
            });
            error = true;
        }
        var itemType = TemplateVar.get("itemId");
        if(!itemType) {
            GlobalNotification.warning({
                content: "Please enter an Item Type.",
                duration: 3
            });
            error = true;
        }
        var itemDescription = template.find("#itemDescription").value;
        if(!itemDescription) {
            GlobalNotification.warning({
                content: "Please enter an Item Description.",
                duration: 3
            });
            error = true;
        }
        var mediaType = template.find("#mediaType").value;
        if(!mediaType) {
            GlobalNotification.warning({
                content: "Please select an Item Media Type.",
                duration: 3
            });
            error = true;
        }

        if(!error) {
            var itemObject = {title:itemName, description:itemDescription, link:itemHash, type:itemType, media:mediaType};
            var objStr = JSON.stringify(itemObject);
            var objHash = web3.sha3(objStr);
            console.log(objStr);
            console.log(objHash);
            var objFrom = JSON.parse(objStr);
            console.log(objFrom);
            Subscriptions.channelExist(web3.eth.defaultAccount,function(e,res){
                TemplateVar.set(template, 'exist', res);
                console.log(res);
                if(res) {
                    Subscriptions.getChannelContract(web3.eth.defaultAccount,function(e,res){
                        TemplateVar.set(template, 'conAddress', res);
                        console.log("contractadd-" + res);
                        var address = res;
                        Channel.addItem(address,itemObject, function(err,result) {
                            if(!err)  {
                                GlobalNotification.success({
                                    content: "Successfully Added Item. Please Wait for changes to propograte throughout the blockchain.",
                                    duration: 5
                                });
                            }
                            Router.go('channel',{channel: web3.eth.defaultAccount.toString()},{});
                        })
                    })
                }
            })
        }
        // var add = TemplateVar.getFrom('.dapp-address-input', 'value');
        // if(add == "" || add == undefined || add == null) {
        //     console.log("please enter valid address"); //add message
        // }
        // else {
        //     Router.go('channel',{channel: add},{});//query: 'channel='+add
        //     Session.setDefault("channel", add);
        //     EthElements.Modal.hide();
        // }
        
    },

    'click #itemType': function(event, template) {
        
        console.log(event.target.value);
        TemplateVar.set("itemId", event.target.value);
        //Router.go('addItemWithId',{itemId:event.target.value},{});
    }


});

// template handlebar helper methods
Template['components_addItemContent'].helpers({
    // 'account': function(){
	// 	return web3.eth.defaultAccount;
    // },
    
});
