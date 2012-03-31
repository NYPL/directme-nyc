/** ## Require JS configuration */
//* jquery is required in this application instance

/** jquery can be an ajax call, manually loaded due to speed up time with `DV` and `jammit` */

require.config({
	waitSeconds: 20,
	paths: {
		require: 'libs/require',
		jquery: 'libs/jquery-1.7.1.min',
		libs: 'libs',
		modules: 'modules',
		bootstrap: 'bootstrap'
	}
});

var depRun = function() {
	require(['libs/respond.min', 'app', 'plugins', 'analytics'], function(respond, app, plugins, analytics) {
		analytics.track('UA-1420324-103');

		if (environment.hasOwnProperty('deps') && environment.deps !== null) {
			app.initialize({depends: environment.deps});
		}
		else {
			app.initialize();
		}
	});
}

/** ### Require libs for all handlers... which instantiate app.js */
//* Checks for deps and/or libs dependent on the handler/route/page call

require(['libs/jquery-1.7.1.min', 'libs/underscore'], function($, _) { 
		/** The environment object is loaded per `layout.slim` */
		if (environment.hasOwnProperty('consts') && environment.consts !== null) {
			/** load index/route/handler specific constant funcs */
			require(environment.consts, function() {
				/** load post-dom-ready globals in order */
				depRun();
			});
		}
		else {
			depRun()
		}
	});