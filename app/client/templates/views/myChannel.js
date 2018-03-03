/**
Template Controllers

@module Templates
*/

/**
The myChannel template

@class [template] views_myChannel
@constructor
*/

Template['views_myChannel'].helpers({
    /**
    Get the name
    @method (name)
    */

    'name': function(){
        return this.name; //|| TAPi18n.__('dapp.myChannel.defaultName');
    }
});

// When the template is created
Template['views_myChannel'].onCreated(function(){
	//Meta.setSuffix(TAPi18n.__("dapp.myChannel.title"));
});
