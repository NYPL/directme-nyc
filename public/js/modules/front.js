define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;

	function _init() {
		latestStories();
	}

	function latestStories() {
		return $.getJSON(urlpath + '/api/stories.json?limit=5&callback=?', function(data) {
			if (data.hasOwnProperty('stories')) {
				addStories(data.stories);
			}
		});

	}

	function addStories(stories) {
		var str = "";
		for (var i=0; i<stories.length; ++i) {
			var story = stories[i];
			if (i%2 == 0) {
				str += '<div class="story"><p>'+story.content+'</p><p class="author">Posted by <strong>'+story.author+'</strong> <a href="'+story.result_url+'" class="hl">'+story.time_ago+' ago</a></p></div>';
			}
			else {
				str += '<div class="story even"><p>'+story.content+'</p><p class="author">Posted by <strong>'+story.author+'</strong> <a href="'+story.result_url+'" class="hl">'+story.time_ago+' ago</a></p></div>';
			}
		}
		$("#stories h2").after(str);
	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});