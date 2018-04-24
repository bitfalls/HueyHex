
Router.configure({
    layoutTemplate: 'layout_main',
    notFoundTemplate: 'views_home',
    yieldRegions: {
        'layout_header': {to: 'header'}
        , 'layout_footer': {to: 'footer'}
    }
});

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

Router.route('/addItem/:itemId', {
    template: 'views_addItem',
    name: 'addItem'
});

Router.route('/browse/:sortParam', {
    template: 'views_browse',
    name: 'browse'
});
