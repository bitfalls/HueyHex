/**
Template Controllers

@module Templates
*/

/**
The channel template

@class [template] views_channel
@constructor
*/


Template['views_channel'].onRendered(function() {
    //console.log(Router.current().params.channel);
    TemplateVar.set(this,'test',true);
});


Template['views_channel'].helpers({
    /**
    Get the name

    @method (name)
    */

    'name': function(){
        return this.name;
    }
});

// When the template is created
Template['views_channel'].onCreated(function(){
	//Meta.setSuffix(TAPi18n.__("dapp.view1.title"));
});
