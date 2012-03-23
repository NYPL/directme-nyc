define(['jquery'], function($) {

	function _init() {
		$.getJSON(window.location.protocol + "//" + window.location.host + "/indexes/" + environment.borough + '.json', function(data) {
			var idx_data = data.idxs;
			loader(environment.borough, idx_data);
		});
	}

	function loader(borough, indexes) {
		var docUrl = window.location.protocol + "//" + window.location.host + "/dvs/" + borough + '.json';
		DV.load(docUrl, { 
			container: '.DV',
			sidebar: false,
			search: false,
			idxs: indexes
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});