


Template['components_browseChannels'].onRendered(function(){
    var template = this;
    TemplateVar.set(template, 'allChannels',new Array);
    
    //var account = web3.eth.defaultAccount;
    //TemplateVar.set(template,'account', account);
    
	Tracker.autorun(function(){
        TemplateVar.set(template,'sortParam',Router.current().params.sortParam.toString())
        TemplateVar.set(template, 'allChannels',new Array);
        console.log(TemplateVar.get(template,'sortParam'));
        Subscriptions.getAllChannels(function(err, result){
            if(!err && result !== undefined) {
                var address = result;
                var temp = TemplateVar.get(template,'allChannels');
                Subscriptions.getChannelInfo(address, function(err, subscriberCount, totalDonations) {
                    console.log('res', subscriberCount,totalDonations);
                    if(!err) {
                        console.log(temp);
                        var channelObj = {
                            "channel": address,
                            "subscribers": subscriberCount,
                            "donations": totalDonations
                        };
                        temp.push(channelObj);
                        if(TemplateVar.get(template,'sortParam') == "donations") {
                            temp.sort(function(obj1,obj2){
                                //TemplateVar.set(template,'donationClass', '<span style = "color:white;font-weight:bold">');
                                //TemplateVar.set(template,'subscribeClass', 'style = "color:white"');
                                return obj2.donations - obj1.donations;
                            });
                        } else {
                            temp.sort(function(obj1,obj2){
                                //TemplateVar.set(template,'subscribeClass', 'style = "color:white;font-weight:bold"');
                                //TemplateVar.set(template,'donationClass', 'style = "color:white"');
                                return obj2.subscribers - obj1.subscribers;
                            });
                        }
                        TemplateVar.set(template, 'allChannels',temp);
                        //console.log('all channels', result);
                    }
                    
                });
            }
        });
        
    });
    
});

Template['components_browseChannels'].events({

});


Template['components_browseChannels'].helpers({
    'allChannels': function(){
        Tracker.autorun(function(){
        var channelList = TemplateVar.get('channelList');
        console.log('here1', TemplateVar.get('channelList'));
        return channelList;
    });
    },
    

});
