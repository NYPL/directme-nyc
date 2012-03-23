define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;

	function _init() {
		latest();
	}

	function latest() {
		$.when(latestLocations(), latestStories()).done(function(loc_data, story_data) {

			log(loc_data[0]);
			log(story_data[0]);

			if ('locations' in loc_data[0]) {
				showLocations(loc_data[0].locations);
			}

			else {
				loc = [];
				showLocations(loc);
			}

			if ('stories' in story_data[0]) {
				addStories(story_data[0].stories);
			}

		});
	}

	function latestLocations() {
		return $.getJSON(urlpath + '/locations.json?limit=30&callback=?', function(data) {
		});

	}

	function latestStories() {
		return $.getJSON(urlpath + '/stories.json?limit=200&callback=?', function(data) {
		});

	}

	function showLocations(loc) {
		wax.tilejson('http://a.tiles.mapbox.com/v3/nypllabs.nyc1940-11.jsonp',
			function(tilejson) {
				// limit bounds of map
				var NE = new L.LatLng(41.0053,-74.4234),
			    SW = new L.LatLng(40.3984,-73.5212),
			    bounds = new L.LatLngBounds(SW, NE);

				var map = new L.Map('bigmap', {zoomControl: false, trackResize: false, maxBounds:bounds}).addLayer(
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
					m.bindPopup("<strong><a href='" + it.url + "'>" + it.address + "</a></strong><br />Found " + it.time_ago + " ago");
				}
				
				// center on last marker
				map.setView(new L.LatLng(40.6537555, -73.9867), 11);
				//map.setView(new L.LatLng(loc[loc.length-1].coordinates.lat, loc[loc.length-1].coordinates.lng), 11);
				
				map.attributionControl.addAttribution("<a href='http://www.nypl.org/locations/schwarzman/map-division/fire-insurance-topographic-zoning-property-maps-nyc' title='open in new window' target='_blank'>Find more maps in the Lionel Pincus & Princess Firyal Map Division</a>");
				
				// disable zooming interaction
				//map.dragging.disable();
				map.touchZoom.disable();
				map.scrollWheelZoom.disable();
				map.doubleClickZoom.disable();
			}
		);
		wax.tilejson('http://a.tiles.mapbox.com/v3/nypllabs.nyc1940-11.jsonp',
				function(tilejson1) {
					// limit bounds of map
					var NE1 = new L.LatLng(41.0053,-74.4234),
				    SW1 = new L.LatLng(40.3984,-73.5212),
				    bounds1 = new L.LatLngBounds(SW1, NE1);

					var map1 = new L.Map('bigmap2', {zoomControl: false, trackResize: false, maxBounds:bounds1}).addLayer(
							new wax.leaf.connector(tilejson1));
						
					var CensusIcon1 = L.Icon.extend({
						iconUrl: 'images/marker.png',
						shadowUrl: 'images/marker-shadow.png',
						iconSize: new L.Point(43, 35),
						shadowSize: new L.Point(43, 35),
						iconAnchor: new L.Point(11, 35),
						popupAnchor: new L.Point(2, -35)
					});
					
					var markerIcon1 = new CensusIcon1();
					
					// add markers
					for (var i=0;i<loc.length;++i) {
						var it = loc[i];
						var m = new L.Marker(new L.LatLng(it.coordinates.lat, it.coordinates.lng), {icon: markerIcon1});
						map1.addLayer(m);
						m.bindPopup("<strong><a href='" + it.url + "'>" + it.address + "</a></strong><br />Found " + it.time_ago + " ago");
					}
					
					// center on last marker
					map1.setView(new L.LatLng(40.6537555, -73.9867), 11);
					//map.setView(new L.LatLng(loc[loc.length-1].coordinates.lat, loc[loc.length-1].coordinates.lng), 11);
					
					map1.attributionControl.addAttribution("<a href='http://www.nypl.org/locations/schwarzman/map-division/fire-insurance-topographic-zoning-property-maps-nyc' title='open in new window' target='_blank'>Find more maps in the Lionel Pincus & Princess Firyal Map Division</a>");
					
					// disable zooming interaction
					//map.dragging.disable();
					map1.touchZoom.disable();
					map1.scrollWheelZoom.disable();
					map1.doubleClickZoom.disable();
				}
			);
	}
	
	function addStories(stories) {
		for (var i=0;i<stories.length;++i) {
			var story = stories[i];
			var str = '<div class="annotation"><p class="content">'+story.content+'</p><p class="author">Posted by <strong>'+story.author+'</strong> <a href="'+story.result_url+'" class="hl">'+story.time_ago+' ago</a></p></h4>';
			$("#annotations").append(str);
		}
	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});