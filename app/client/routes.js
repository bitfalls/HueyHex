
Router.configure({
    layoutTemplate: 'layout_main',
    notFoundTemplate: 'layout_notFound',
    yieldRegions: {
        'layout_header': {to: 'header'}
        , 'layout_footer': {to: 'footer'}
    }
});

//////FIIIIIIIIIIXXXXXXXXXXXXXXXXXXX!!!!!!!!!!!!
console.log(location.origin.substring(0,3));
if(location.origin.substring(0,4) === 'file') {
    Router.wait();
    Router.initialize({hashbang: true});

    Meteor.startup(function() {
        Router.go('home');
        
    });
}

Router.route('/', {
    template: 'views_home',
    name: 'home'
});

Router.route('/channel/:channel', {
    template: 'views_channelHome',
    name: 'channel'
});

Router.route('/channel/:channel/:itemId', {
    template: 'views_channel',
    name: 'channelWithId'

});

Router.route('/settings', {
    template: 'views_settings',
    name: 'settings'
});

Router.route('/addItem', {
    template: 'views_addItem',
    name: 'addItem'
});

Router.route('/browse', {
    template: 'views_browse',
    name: 'browse'
});