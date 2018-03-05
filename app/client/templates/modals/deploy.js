
Template['modals_deploy'].onRendered(function(){
    var test = TemplateVar.getFrom('components_newChannel.new-Channel','status');
    console.log(test);

}

);

Template['modals_deploy'].helpers({
    
    });
    
Template['modals_deploy'].events({
    'click #btn-cancel': function(event, template){
        EthElements.Modal.hide();
    }
    
});