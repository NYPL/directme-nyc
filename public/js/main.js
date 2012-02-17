require.config({
	paths: {
		require: 'libs/require',
		jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min'
	}
});

require(['domReady', 'libs/modernizr-2.0.6', 'plugins', 'app'], function(domReady, modernizr, plugins, app) {
	domReady(function () {
		if (environment.hasOwnProperty('deps') && environment.deps !== null) {
			app.initialize({depends: environment.deps});
		}
		else {
			app.initialize();
		}
	});
});