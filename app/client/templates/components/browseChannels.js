


Template['components_browseChannels'].onRendered(function(){
    var template = this;
    TemplateVar.set(template, 'allChannels',new Array);
	Tracker.autorun(function(){
        var sortParam = Router.current().params.sortParam;
        TemplateVar.set(template,'sortParam', sortParam);
        TemplateVar.set(template, 'allChannels',new Array);
        Subscriptions.getAllChannels(function(err, result){
            if(!err && result !== undefined) {
                var address = result;
                var temp = TemplateVar.get(template,'allChannels');
                Subscriptions.getChannelInfo(address, function(err, subscriberCount, totalDonations) {
                    if(!err) {
                        var channelObj = {
                            "channel": address,
                            "subscribers": subscriberCount,
                            "donations": totalDonations.toFixed(2)
                        };
                        temp.push(channelObj);
                        if(TemplateVar.get(template,'sortParam') == "donations") {
                            temp.sort(function(obj1,obj2){
                                return obj2.donations - obj1.donations;
                            });
                        } else {
                            temp.sort(function(obj1,obj2){
                                return obj2.subscribers - obj1.subscribers;
                            });
                        }
                        TemplateVar.set(template, 'allChannels',temp);
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
            return channelList;
        });
    },
    
});
