define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;

	function _init() {
		latestStories();
	}

	function latestStories() {
		return $.getJSON(urlpath + '/api/stories.json?limit=8&callback=?', function(data) {
			if (data.hasOwnProperty('stories')) {
				addStories(data.stories);
			}
		});

	}

	function addStories(stories) {
		var str = "";
		for (var i=0; i<stories.length; ++i) {
			var story = stories[i];

			if (story.content.length > 140) {
				story.content = story.content.substring(0, 137) + '...'
			}

			if (i%2 == 0) {
				str += '<div class="story"><p>'+story.content+'</p><p class="author">Posted by <strong>'+story.author+'</strong> <a href="'+urlpath+'/results?token='+story.result_token+'" class="hl">'+story.time_ago+' ago</a></p></div>';
			}
			else {
				str += '<div class="story even"><p>'+story.content+'</p><p class="author">Posted by <strong>'+story.author+'</strong> <a href="'+urlpath+'/results?token='+story.result_token+'" class="hl">'+story.time_ago+' ago</a></p></div>';
			}
		}
		$("#stories h2").after(str);
	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});