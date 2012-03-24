define(['jquery'], function($) {

	function _init() {
		$.getJSON(window.location.protocol + "//" + window.location.host + "/indexes/" + environment.borough + '.json', function(data) {
			var idx_data = null;
			var sect_data = null;

			if ('idxs' in data) {
				var idx_data = data.idxs;
			}

			if ('sections' in data) {
				var sect_data = data.sections;
			}

			loader(environment.borough, idx_data, sect_data);
		});
	}

	function loader(borough, indexes, sections) {
		if (indexes==undefined || indexes==null) indexes = '';
		if (sections==undefined || sections==null) sections = '';
		var docUrl = window.location.protocol + "//" + window.location.host + "/dvs/" + borough + '.json';
		DV.load(docUrl, { 
			container: '.DV',
			sidebar: false,
			search: false,
			idxs: indexes,
			sections: sections
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});