/** ## Require JS configuration */
//* jquery is required in this application instance

/** jquery can be an ajax call, manually loaded due to speed up time with `DV` and `jammit` */

require.config({
	waitSeconds: 12,
	paths: {
		require: 'libs/require',
		jquery: 'libs/jquery-1.7.1.min',
		libs: 'libs',
		modules: 'modules'
	}
});

/** ### Require libs for all handlers... which instantiate app.js */
//* Checks for deps and/or libs dependent on the handler/route/page call

/** load pre-dom-ready globals */
require(['modules/async_tk', 'libs/jquery-1.7.1.min'], function(tk, $) { 
		/** The environment object is loaded per `layout.slim` */
		if (environment.hasOwnProperty('consts') && environment.consts !== null) {
			/** load index/route/handler specific constant funcs */
			require(environment.consts)
		}
		/** load post-dom-ready globals in order */
		require(['order!domReady', 'order!libs/modernizr-2.0.6', 'order!app', 'order!plugins'], function(domReady, modernizr, app, plugins) { 
			domReady(function() {
				if (environment.hasOwnProperty('deps') && environment.deps !== null) {
					app.initialize({depends: environment.deps});
				}
				else {
					app.initialize();
				}
			});
		});
	});