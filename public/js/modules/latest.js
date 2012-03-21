define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;

	function _init() {
		latestLocations();
	}

	function latestLocations() {

		$.getJSON(urlpath + '/locations.json?limit=2&callback=?', function(data) {
			log(data);
		});

	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});