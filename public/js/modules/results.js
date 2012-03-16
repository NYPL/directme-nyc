define(['jquery', 'modules/current_header'], function($, header) {

	var urlpath = window.location.protocol + "//" + window.location.host;

	function _init() {
		header.init('#nav_bar a');
	}

	function EDcall() {
		$.getJSON(urlpath + '/streets/' + environment.borough + '.json?callback=?', function(data) {

		});
	}


	/** Return instantiated function */
	return {
		init: _init(),
	};
});