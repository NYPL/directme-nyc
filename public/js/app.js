define(['require', 'jquery'], function(require, $) {
	return {
		initialize: function(args) {
			log('init app');
			if(typeof args !== 'undefined') {
				if(args.hasOwnProperty('depends')) {                                                                                                                                                                                                                                                                                                                     
					require(args.depends, this.onDependsLoaded);
				}
			}
		},

		onDependsLoaded: function() {
		}
	};
});