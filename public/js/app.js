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

			//call script funcs
			this.onScrollNav();
		},

		/** on the `init` call for a module, a function should be instantiated */
		
		//* (later) like Backbone, init calls below should instantiate a `new` class, as each module should return a new instance of its class/view
		onDependsLoaded: function(mods) {
			console.log('spec. modules being loaded and init_ed');
			for (var i = 0; i < mods.length; i++) {
				log(mods[i])
				mods[i].init;
			}
		},

		onScrollNav: function() {
			var o_top = $('.navbar-fixed-top').css('top');
			$(document).scroll(function(){
				if ($('#nypl_bar').outerHeight() <= $(this).scrollTop()) {
					$('.navbar-fixed-top').css('top', 0);
				}
				else {
					$('.navbar-fixed-top').css('top', o_top);
				}
			});
		}
	};
});