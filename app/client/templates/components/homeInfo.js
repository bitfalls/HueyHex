

Template['components_homeInfo'].onRendered(function(){
	
	var template = this;
	Tracker.autorun(function(){
        web3.eth.getAccounts(function(error, result) {
            if(!error){
                web3.eth.defaultAccount = result[0];
                TemplateVar.set(template,'account', web3.eth.defaultAccount);
                web3.eth.getBalance(web3.eth.defaultAccount, function(err, result){
                    var ethVal = web3.fromWei(result, "Ether").toFixed(4);
                    TemplateVar.set(template, 'balance' ,ethVal);
                });
                Token.getBalance(web3.eth.defaultAccount,function(err, result){
                    if(!err) {
                        TemplateVar.set(template,'hueyBalance', result.toFixed(2));
                    }
                });
            
            }
        });

    });
});

Template['components_homeInfo'].events({
    "click #buyBtn": function(event, template) {
        EthElements.Modal.question({
            template: 'modals_coming'
        })
    },
});

Template['components_homeInfo'].helpers({
    
});
