define(['signals','crossroads', 'app/functions', 'handlebars', 'app/translations'], function ( signals, crossroads, functions, Handlebars, translations ) {
	crossroads.addRoute( '/login', function () {
		require(['text!templates/login.html', 'app/login'], function ( loginPage ) {
			functions.page(loginPage, "login");
		} );
	} );

	crossroads.addRoute( '/signup', function () {
		require( ["text!templates/signup.html", "app/signup"], function ( signupPage ) {
			functions.page(signupPage, "signup");
		} );
	} );

	crossroads.bypassed.add( function ( request ) {

	} );
} );