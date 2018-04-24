

Template['views_settings'].helpers({

    'name': function(){
        return this.name || TAPi18n.__('dapp.settings.defaultName');
    }
});

Template['views_settings'].onCreated(function(){

});
