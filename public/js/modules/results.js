define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;

	function _init() {
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