define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;

	function _init() {
		//defined module inits
		getHeadlines();


	}

	function getHeadlines() {
		$.getJSON(urlpath + '/headlines.json?callback=?', function(data) {
			//do stuff here with data, returns hdl(headline)/lead(description)/ny_url(times url)/pq_id(proquest article id... ip true/false to come)
			//log(data);
		});
	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});