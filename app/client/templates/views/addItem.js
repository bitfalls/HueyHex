/**
Template Controllers

@module Templates
*/

/**
The addItem template

@class [template] views_addItem
@constructor
*/


Template['views_addItem'].onRendered(function() {
    
        console.log(Router.current().params.channel);
        
});
    
    
Template['views_addItem'].helpers({
    /**
    Get the name
    
    @method (name)
    */
    
    'name': function(){
        return this.name;
    }
});
    
// When the template is created
Template['views_addItem'].onCreated(function(){
    //Meta.setSuffix(TAPi18n.__("dapp.view1.title"));
});