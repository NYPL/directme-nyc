(function($) {

	//load the DV from the correct borough loader

	//init method for module
	function _init() {
		$.getJSON(window.location.protocol + "//" + window.location.host + "/api/indexes/" + environment.borough + '.json', function(data) {
			if (data.hasOwnProperty('idxs')) {
				var idx_data = data.idxs;
			}

			if (data.hasOwnProperty('sections')) {
				var sect_data = data.sections;
			}

			loader(environment.borough, idx_data, sect_data);
		});
	}

	//load it up as per document viewer specifications... via DV.load
	function loader(borough, indexes, sections) {
		if (typeof indexes === 'undefined' || indexes === null) indexes = '';
		if (typeof sections === 'undefined' || sections === null) sections = false;
		var docUrl = window.location.protocol + "//" + window.location.host + "/api/dvs/" + borough + '.json';
		if (borough === 'staten') { borough = 'Staten Island';};
		DV.load(docUrl, { 
			container: '.DV',
			sidebar: false,
			search: false,
			idxs: indexes,
			sections: sections,
			boro: borough
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
})(jQuery);