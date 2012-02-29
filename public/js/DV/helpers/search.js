_.extend(DV.Schema.helpers, {
	getSearchResponse: function(query){
			var handleResponse = DV.jQuery.proxy(function(response){
			this.viewer.searchResponse = response;
			var hasResults = (response.results.length > 0) ? true : false;

			var text = hasResults ? 'of '+response.results.length + ' ' : ' ';
			this.viewer.$('span.DV-totalSearchResult').text(text);
			this.viewer.$('span.DV-searchQuery').text(response.query);
			if (hasResults) {

			}
		}, this);

		var failResponse = function() {
			this.viewer.$('.DV-currentSearchResult').text('Search is not available at this time');
			this.viewer.$('span.DV-searchQuery').text(query);
			this.viewer.$('.DV-searchResults').addClass('DV-noResults');
		};
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