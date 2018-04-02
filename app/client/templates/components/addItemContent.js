
Template['components_addItemContent'].onRendered(function(){
	
    var template = this;

	this.autorun(function(){
        TemplateVar.set(template,"itemId", Router.current().params.itemId);   
        var account = web3.eth.defaultAccount;
        TemplateVar.set(template,'account', account);
        switch(TemplateVar.get(template,"itemId")){
            case "0":
                TemplateVar.set(template,"itemPlaceHolder", "magnet:?xt=urn:btih:73289b...");
                break;
            case "1":
                TemplateVar.set(template,"itemPlaceHolder", "/ipfs/QmXoypizjW3Wkn...")
                break;
            case "2":
                TemplateVar.set(template,"itemPlaceHolder", "bzz:/hueyhex.eth");
                break;
        }
    });
});

Template['components_addItemContent'].events({
    'click #addItemBtn': function(event, template){
        var error = false;
        console.log(template.find("#itemType").value);
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
        var itemType = template.find("#itemType").value;
        if(!itemType) {
            TemplateVar.set("itemId", event.target.value);            
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
            var objFrom = JSON.parse(objStr);
            Subscriptions.channelExist(web3.eth.defaultAccount,function(e,res){
                TemplateVar.set(template, 'exist', res);
                if(res) {
                    Subscriptions.getChannelContract(web3.eth.defaultAccount,function(e,res){
                        TemplateVar.set(template, 'conAddress', res);
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
    },

    'click #itemType': function(event, template) {
        var id = event.target.value;
        Router.go('addItem', {itemId: id},{});
    }

});

Template['components_addItemContent'].helpers({

    
});
