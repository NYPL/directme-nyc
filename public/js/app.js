/** ## App Initialization for all handlers */

define(['require', 'jquery'], function(require, $) {
	return {
		initialize: function(args) {
			//requires handler dependent libraries and modules
			log('init app');

			if(typeof args !== 'undefined') {
				if(args.hasOwnProperty('depends')) {                                                                                                                                                                                                                                                                                                                   
					require(args.depends, this.onDependsLoaded(args.depends));
				}
			}

			this.ajaxSetup();

			//typical header bar
			this.setCurrent('#nav_bar a');
		},

		ajaxSetup: function() {
			/*
			* Set the CSRF token for each AJAX request, Rack::Csrf handle the rest.
			* Assumes your layout has a metatag with name of "_csrf" and you're
			* using the default Rack:Csrf header setup.
			*/
			$.ajaxSetup({
				beforeSend: function(xhr) {
					var token = $('meta[name="_csrf"]').attr('content');
					xhr.setRequestHeader('X_CSRF_TOKEN', token);
				}
			});
		},

		setCurrent: function(elem) {
			$(elem).each(function () {
				if ($(this).attr('href') === location.pathname) {
					$(this).addClass('current');
				}
			});

			$(elem).hover(function() {
				$(this).addClass('current');
			}, 
			function() {
				if ($(this).attr('href') !== location.pathname) {
					$(this).removeClass('current');
				}
			});		
		},

		/** on the `init` call for a module, a function should be instantiated */
		
		//* (later) like Backbone, init calls below should instantiate a `new` class, as each module should return a new instance of its class/view
		onDependsLoaded: function(mods) {
			console.log('spec. modules being loaded and init_ed');
			for (var i = 0; i < mods.length; i++) {
				mods[i].init;
			}
		}
	};
});