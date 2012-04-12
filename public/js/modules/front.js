(function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;

	function _init() {
		latestStories();
	}

	function latestStories() {
		return $.getJSON(urlpath + '/api/stories.json?limit=8&include_loc=true&callback=?', function(data) {
			if (data.hasOwnProperty('stories')) {
				addStories(data.stories, data.addresses);
			}
		});

	}

	function addStories(stories, addresses) {
		var str = "";
		for (var i=0; i<stories.length; ++i) {
			var story = stories[i];

			if ($.isEmptyObject(addresses)) {
				address_token = null;
			}
			else {
				address_token = addresses[story.result_token];
			}

			if (i%2 == 0) {
				str += prepareStoryHTML("story", story.content, story.author, story.time_ago, urlpath, story.result_token, address_token, true);
			}
			else {
				str += prepareStoryHTML("story even", story.content, story.author, story.time_ago, urlpath, story.result_token, address_token, true);
			}
		}
		$("#stories h2").after(str);
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
}(jQuery));