

Template['components_homeInfo'].onCreated(function(){
	
	var template = this;
	template.autorun(function(){
        web3.eth.getAccounts(function(error, result) {
            if(!error){
                web3.eth.defaultAccount = result[0];
                TemplateVar.set(template,'account', web3.eth.defaultAccount);
                web3.eth.getBalance(web3.eth.defaultAccount, function(err, result){
                    //console.log(result);
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
        location.href = 'https://etherdelta.com/#'+ LocalStore.get('tokenContractAddress')+'-ETH';
    },
});

Template['components_homeInfo'].helpers({
    
});
