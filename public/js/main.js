require.config({
	paths: {
		baseUrl: 'public/js',
		require: 'libs/require',
		jquery: 'libs/jquery-1.7.1.min',
		libs: 'libs',
		modules: 'modules'
	}
});

require(['domReady', 'libs/modernizr-2.0.6', 'libs/swfobject', 'plugins', 'app'], 
	function(domReady, modernizr, swfobject, plugins, app) { domReady(function () {
		if (environment.hasOwnProperty('deps') && environment.deps !== null) {
			app.initialize({depends: environment.deps});
		}
		else {
			app.initialize();
		}
	});
});