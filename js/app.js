requirejs.config({
    urlArgs : "time=" + (new Date()).getTime(),
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        templates: '../../templates',
        alerts : "../../templates/alerts",
        jquery : [
        	'jquery.min',
        	'//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min'
        ],
        bootstrap: 'bootstrap.min',
        signals: 'signals',
        crossroads: 'crossroads.min',
        handlebars: 'handlebars',
        history: 'jquery.history.min',
    },
    shim : {
    	'bootstrap': ['jquery'],
        'crossroads' : ['signals'],
        'handlebars': {
            exports: 'Handlebars'
        },
        "history" : {
            deps :["jquery"],
            exports : 'History'
        }
    }
});

require(['app/config', 'jquery', 'bootstrap', 'signals', 'crossroads', 'handlebars', 'history', 'text!templates/navbar.html', 'app/routes', 'app/translations', 'app/functions'], function ( config, $, bootstrap, signals, crossroads, Handlebars, history, navbar, routes, translations, functions ) {
	var template = Handlebars.compile(navbar);
    var context = $.extend({}, translations, config);

    $('body').prepend(template(context));
    template = Handlebars.compile($('title').attr("data-title"));
    $('title').html(template(context));

	History.Adapter.bind(window, 'statechange', function () {
        crossroads.parse(functions.getPage(config.baseUrl, ''));
    } );

    $(document).ready( function () {
        crossroads.parse(functions.getPage(config.baseUrl, ''));
    } );

    $(document).on('click', 'a', function ( event ) {
    	event.preventDefault();

    	History.pushState(null, null, config.baseUrl + $(this).attr('href'));
    } );
} );