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
				str += prepareStoryHTML("story", story.content, story.author, story.time_ago, urlpath, story.result_token);
			}
			else {
				str += prepareStoryHTML("story even", story.content, story.author, story.time_ago, urlpath, story.result_token);
			}
		}
		$("#stories h2").after(str);
	}

	function prepareStoryHTML(css, content, author, time_dist, url, token) {
		var a = content.split(" ");
		var i,l=a.length;
		var limit = 28;
		// http://en.wikipedia.org/wiki
		// 28
		for (i=0;i<l;++i) {
			// is it a url?
			var tmp = "";
			// no links in home (could be broken)
			// is it long?
			if (a[i].length > limit) {
				tmp += a[i].substr(0,limit) + " " + a[i].substr(limit);
			} else {
				tmp += a[i];
			}
			a[i] = tmp;
		}
		content = a.join(" ");
		return "<div class='"+css+"'><p class='author'><strong>" + author + "</strong> wrote:</p><p class='content'>" + content + "</p><p class='author'><a href=\""+url+"/results?token="+token+"\" class=\"hl\">" + time_dist + " ago</a></p></div>";
	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});