define(['jquery'], function($) {

	function _init() {
		$.getJSON(window.location.protocol + "//" + window.location.host + "/indexes/" + environment.borough + '.json', function(data) {
			if ('idxs' in data) {
				var idx_data = data.idxs;
				loader(environment.borough, idx_data);
			}

			else {
				loader(environment.borough);
			}
		});
	}

	function loader(borough, indexes) {
		if (indexes==undefined) indexes = '';
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