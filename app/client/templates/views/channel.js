
Template['views_channel'].onRendered(function() {
    TemplateVar.set(this,'test',true);
});


Template['views_channel'].helpers({

    'name': function(){
        return this.name;
    }
    
});

Template['views_channel'].onCreated(function(){
});
