/**
Template Controllers

@module Routes
*/

/**
The app routes

@class App routes
@constructor
*/

// Change the URLS to use #! instead of real paths
// Iron.Location.configure({useHashPaths: true});

// Router defaults
Router.configure({
    layoutTemplate: 'layout_main',
    notFoundTemplate: 'layout_notFound',
    yieldRegions: {
        'layout_header': {to: 'header'}
        , 'layout_footer': {to: 'footer'}
    }
});

//////FIIIIIIIIIIXXXXXXXXXXXXXXXXXXX!!!!!!!!!!!!
if(location.origin.substring(0,3) === 'file') {
    Router.wait();
    Router.initialize({hashbang: true});

    Meteor.startup(function() {
        Router.go('home');
        
    });
}
// ROUTES

/**
The receive route, showing the wallet overview

@method dashboard
*/

// Default route
Router.route('/', {
    template: 'views_home',
    name: 'home'
});

// Route for view1
Router.route('/channel/:channel', {
    template: 'views_channelHome',
    name: 'channel'
});

Router.route('/channel/:channel/:itemId', {
    template: 'views_channel',
    name: 'channelWithId'

});


// Route for myChannel
Router.route('/settings', {
    template: 'views_settings',
    name: 'settings'
});

// Route for myChannel
Router.route('/addItem', {
    template: 'views_addItem',
    name: 'addItem'
});

// Router.route('/addItem/:itemId', {
//     template: 'views_addItem',
//     name: 'addItemWithId'
// });

Router.route('/browse', {
    template: 'views_browse',
    name: 'browse'
});