
if(Meteor.isClient) {

	Meta.config({
	  options: {
		suffix: ''
	  }
	});

	Meta.setSuffix = function(suffix){
	  Meta.setTitle(TAPi18n.__("dapp.app.title") + ' | ' + suffix);
	};
}
