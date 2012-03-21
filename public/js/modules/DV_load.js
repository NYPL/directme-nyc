define(['jquery'], function($) {

	function _init() {
		loader(environment.borough);
	}

	function loader(borough) {
		var docUrl = window.location.protocol + "//" + window.location.host + "/dvs/" + borough + '.json';
		DV.load(docUrl, { 
			container: '.DV',
			sidebar: false,
			search: false
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});