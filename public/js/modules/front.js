define(['jquery', 'modules/current_header'], function($, header) {

	function _init(elem) {
		//defined module inits
		header.init('#nav_bar a');
	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});