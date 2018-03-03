/**
Template Controllers

@module Templates
*/

/**
The settings template

@class [template] views_settings
@constructor
*/

Template['views_settings'].helpers({
    /**
    Get the name

    @method (name)
    */

    'name': function(){
        return this.name || TAPi18n.__('dapp.settings.defaultName');
    }
});

// When the template is created
Template['views_settings'].onCreated(function(){
	// /Meta.setSuffix(TAPi18n.__("dapp.settings.title"));
});
