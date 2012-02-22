/** ## App Initialization for all handlers */

define(['require', 'jquery'], function(require, $) {
	return {
		initialize: function(args) {
			//requires handler dependent libraries and modules
			log('init app');
			if(typeof args !== 'undefined') {
				if (args.hasOwnProperty('libs')) {
					require(args.libs, this.onLibsLoaded(args.libs));
				}
				if(args.hasOwnProperty('depends')) {                                                                                                                                                                                                                                                                                                                   
					require(args.depends, this.onDependsLoaded(args.depends));
				}
			}
		},

		onLibsLoaded: function(libs) {
			console.log('spec. libs loaded');
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