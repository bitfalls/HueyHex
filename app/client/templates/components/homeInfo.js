import { isTokenCharValid } from "builder-util";

/**
Template Controllers

@module Templates
*/

/**
The homeInfo template

@class [template] components_homeInfo
@constructor
*/

// when the template is rendered
Template['components_homeInfo'].onRendered(function(){
	
	var template = this;
	this.autorun(function(){
        var account = web3.eth.defaultAccount;
        // /console.log("fdsafdsafdsa"+account)
        TemplateVar.set(template,'account', account);
        web3.eth.getBalance(account, function(err, result){
            var ethVal = web3.fromWei(result, "Ether");
            TemplateVar.set(template, 'balance' ,ethVal);
        });
        Token.getBalance(account,function(err, result){
            if(!err) {
                TemplateVar.set(template,'hueyBalance', result);
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
