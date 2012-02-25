define(function() {
	function _init() {
		var docURrl = "https://www.documentcloud.org/documents/19864-goldman-sachs-internal-emails.json"
		DV.load(docURrl, { 
			container: '#DV-bk',
			height: 500,
			width: 940,
			sidebar: true
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});