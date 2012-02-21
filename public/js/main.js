/*Require JS configuration
	- jquery is required in this application instance
	- jquery can be an ajax call, manually loaded due to speed up time with DV and jammit
*/
require.config({
	paths: {
		baseUrl: 'public/js',
		require: 'libs/require',
		jquery: 'libs/jquery-1.7.1.min',
		libs: 'libs',
		modules: 'modules'
	}
});

/*	Require libs for all handlers... which instantiate app.js 
	- Checks for deps and/or libs dependent on the handler/route/page call
	- The environment object is loaded per layout.slim
*/

require(['domReady', 'libs/modernizr-2.0.6', 'plugins', 'app'], 
	function(domReady, modernizr, plugins, app) { domReady(function () {
		if (environment.hasOwnProperty('deps') && environment.hasOwnProperty('libs') 
			&& environment.deps !== null && environment.libs !== null) {
			app.initialize({depends: environment.deps, libs: environment.libs});
		}
		else if (environment.hasOwnProperty('deps') && environment.deps !== null) {
			app.initialize({depends: environment.deps});
		}
		else if (environment.hasOwnProperty('libs') && environment.libs !== null) {
			app.initialize({libs:environment.libs});
		}
		else {
			app.initialize();
		}
	});
});