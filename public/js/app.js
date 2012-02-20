define(['require', 'jquery'], function(require, $) {
	return {
		initialize: function(args) {
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

		onDependsLoaded: function(mods) {
			console.log('spec. modules being loaded and init_ed');
			for (var i = 0; i < mods.length; i++) {
				mods[i].init;
			}
		}
	};
});