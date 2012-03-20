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

			//resig => array remove
			Array.prototype.remove = function(from, to) {
				var rest = this.slice((to || from) + 1 || this.length);
				this.length = from < 0 ? this.length + from : from;
				return this.push.apply(this, rest);
			};

			this.setCurrent('#nav_bar a');
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