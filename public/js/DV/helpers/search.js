_.extend(DV.Schema.helpers, {
	getSearchResponse: function(query){
			var handleResponse = DV.jQuery.proxy(function(response){
			this.viewer.searchResponse = response;
			var hasResults = (response.results.length > 0) ? true : false;

			var text = hasResults ? 'of '+response.results.length + ' ' : ' ';
			if (hasResults) {

			}
		}, this);

		var failResponse = function() {
		};

		var searchURI = this.viewer.schema.document.resources.search.replace('{query}', encodeURIComponent(query));
		log(searchURI);
		if (this.viewer.helpers.isCrossDomain(searchURI)) searchURI += '&callback=?';
		//DV.jQuery.ajax({url : searchURI, dataType : 'json', success : handleResponse, error : failResponse});
	},

	clearSearch: function(e) {
		this.elements.searchInput.val('').keyup().focus();
	},

	cleanUpSearch: function(){
		var viewer            = this.viewer;
		viewer.searchResponse = null;
		viewer.toHighLight    = null;
		if (this.elements) this.elements.searchInput.keyup().blur();
	}
});