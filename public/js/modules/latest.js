(function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;
	
	var urlForMoreStories = "";
	var isUpdating = false;
	var story_limit = 32

	function _init() {
		latest();
	}

	function latest() {
		$.when(latestLocations(), latestStories()).done(function(loc_data, story_data) {
			if (loc_data[0].hasOwnProperty('locations')) {
				showLocations(loc_data[0].locations);
			}

			else {
				loc = [];
				showLocations(loc);
			}

			if (story_data[0].hasOwnProperty('stories')) {
				urlForMoreStories = story_data[0].before_timestamp;
				if (typeof urlForMoreStories !== 'undefined') {
					$('.more').show();
				}
				else {
					$('.more').hide();
				}
				addStories(story_data[0].stories);
			}

		});

		$("#moreloader").click(
				function () {
					if (!isUpdating) {
						isUpdating = true;
						$(this).html("Loading...");
						moreClick();
					}
				}
		);
	}

	function latestLocations() {
		return $.getJSON(urlpath + '/api/locations.json?limit=30&callback=?', function(data) {
		});

	}

	function latestStories() {
		return $.getJSON(urlpath + '/api/stories.json?limit=' + story_limit + '&callback=?', function(data) {
		});

	}
	
	function moreClick() {
		$.when(moreStories()).done(function(story_data) {
			if (story_data.hasOwnProperty('stories')) {
				if (!story_data.before_timestamp) {
					$(".more").hide();
				}
				else {
					urlForMoreStories = story_data.before_timestamp;
					$("#moreloader").html("Load more stories"); 
				}
				addStories(story_data.stories, story_data.count);
				isUpdating = false;
			}
		});
	}

	function moreStories() {
		return $.getJSON(urlForMoreStories + '&callback=?', function(data) {
		});
	}

	function showLocations(loc) {
		wax.tilejson('http://a.tiles.mapbox.com/v3/nypllabs.nyc1940-11-13.jsonp',
			function(tilejson) {
				// limit bounds of map
				var NE = new L.LatLng(41.0053,-74.4234),
			    SW = new L.LatLng(40.3984,-73.5212),
			    bounds = new L.LatLngBounds(SW, NE);

				var map = new L.Map('bigmap', {zoomControl: true, trackResize: false, maxBounds:bounds, minZoom:11, maxZoom:13}).addLayer(
					new wax.leaf.connector(tilejson));
				
				var CensusIcon = L.Icon.extend({
					iconUrl: 'images/marker.png',
					shadowUrl: 'images/marker-shadow.png',
					iconSize: new L.Point(43, 35),
					shadowSize: new L.Point(43, 35),
					iconAnchor: new L.Point(11, 35),
					popupAnchor: new L.Point(2, -35)
				});
				
				var markerIcon = new CensusIcon();

				// add markers
				for (var i=0;i<loc.length;++i) {
					var it = loc[i];
					var m = new L.Marker(new L.LatLng(it.coordinates.lat, it.coordinates.lng), {icon: markerIcon});
					map.addLayer(m);
					m.bindPopup("<strong><a href='" + urlpath + '/results?token=' + it.token + "'>" + it.main_string + "</a></strong><br />Found " + it.time_ago + " ago");
				}
				
				// center on last marker
				map.setView(new L.LatLng(40.6537555, -73.9867), 11);
				//map.setView(new L.LatLng(loc[loc.length-1].coordinates.lat, loc[loc.length-1].coordinates.lng), 11);
				
				map.attributionControl.addAttribution("<a href='http://www.nypl.org/locations/schwarzman/map-division/fire-insurance-topographic-zoning-property-maps-nyc' title='open in new window' target='_blank'>Find more maps in the Lionel Pincus & Princess Firyal Map Division</a>");
				
				// disable zooming interaction
				//map.dragging.disable();
				//map.touchZoom.disable();
				//map.scrollWheelZoom.disable();
				//map.doubleClickZoom.disable();
			}
		);
	}
	
	function addStories(stories, count) {
		for (var i=0;i<stories.length;++i) {
			var story = stories[i];
			
			if (story.content.length > 140) {
				story.content = story.content.substring(0, 139) + '…'
			}
			var str = prepareStoryHTML(story.content, story.author, story.time_ago, urlpath, story.result_token);
			$("#annotations").append(str);
			if (parseInt(count) == $('.annotation').length) {
				$('.more').hide();
			}
		}
	}

	function prepareStoryHTML(content, author, time_dist, url, token) {
		var a = content.split(" ");
		var i,l=a.length;
		var limit = 28;
		// http://en.wikipedia.org/wiki
		// 28
		for (i=0;i<l;++i) {
			// is it a url?
			var tmp = "";
			// no links in latest (could be broken)
			// is it long?
			if (a[i].length > limit) {
				tmp += a[i].substr(0,limit) + " " + a[i].substr(limit);
			} else {
				tmp += a[i];
			}
			a[i] = tmp;
		}
		content = a.join(" ");
		return "<div class='annotation'><p class='author'><strong>" + author + "</strong> wrote:</p><p class='content'>" + content + "</p><p class='author'><a href=\""+url+"/results?token="+token+"\" class=\"hl\">" + time_dist + " ago</a></p></div>";
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
	
}(jQuery));