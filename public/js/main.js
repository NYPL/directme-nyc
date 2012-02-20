require.config({
	paths: {
		baseUrl: 'public/js',
		require: 'libs/require',
		jquery: 'libs/jquery-1.7.1.min',
		libs: 'libs',
		modules: 'modules'
	}
});

require(['domReady', 'libs/modernizr-2.0.6', 'plugins', 'app'], 
	function(domReady, modernizr, plugins, app) { domReady(function () {
		if (environment.hasOwnProperty('deps') && environment.hasOwnProperty('libs') 
			&& environment.deps !== null && environment.libs !== null) {
			app.initialize({depends: environment.deps, libs:environment.libs});
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