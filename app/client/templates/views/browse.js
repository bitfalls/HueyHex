/**
Template Controllers

@module Templates
*/

/**
The browse template

@class [template] views_browse
@constructor
*/


Template['views_browse'].onRendered(function() {
    

});


Template['views_browse'].helpers({
    /**
    Get the name

    @method (name)
    */

    'name': function(){
        return this.name;
    }
});

// When the template is created
Template['views_browse'].onCreated(function(){
	//Meta.setSuffix(TAPi18n.__("dapp.home.title"));
});
