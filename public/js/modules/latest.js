define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;

	function _init() {
		latestLocations();
	}

	function latestLocations() {

		$.getJSON(urlpath + '/locations.json?limit=2&callback=?', function(data) {
			log(data);
			if (data !== undefined) {
				if ('locations' in data) {
					showLocations(data.locations);
				}
				// remove these fake stories
				data.stories = [
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'Pitchfork cliche shoreditch hoodie viral sriracha, stumptown tattooed scenester ',
				                	name: 'Bob',
				                	time_ago: '1 hour'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'Tattooed ennui dreamcatcher mcsweeneys, high life iphone keytar biodiesel.',
				                	name: 'Bob',
				                	time_ago: '1 hour'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'Biodiesel shoreditch jean shorts typewriter, scenester carles whatever.!',
				                	name: 'Bob',
				                	time_ago: '1 hour'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'It’s amazing how much has changed since then!',
				                	name: 'Bob',
				                	time_ago: '1 hour'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'Craft beer cosby sweater flexitarian gentrify salvia terry richardson, carles fingerstache helvetica ',
				                	name: 'Bob',
				                	time_ago: '2 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'It’s amazing how much has changed since then!',
				                	name: 'Bob',
				                	time_ago: '2 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'It’s amazing how much has changed since then!',
				                	name: 'Bob',
				                	time_ago: '2 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'It’s amazing how much has changed since then!',
				                	name: 'Bob',
				                	time_ago: '2 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'It’s amazing how much has changed since then!',
				                	name: 'Bob',
				                	time_ago: '3 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'It’s amazing how much has changed since then!',
				                	name: 'Bob',
				                	time_ago: '3 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'It’s amazing how much has changed since then!',
				                	name: 'Bob',
				                	time_ago: '3 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'Salvia hella sustainable mcsweeneys ethical truffaut, swag pickled wes anderson!',
				                	name: 'Bob',
				                	time_ago: '3 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'This was my grandma’s house in 1940',
				                	name: 'Mary',
				                	time_ago: '3 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'It’s amazing how much has changed since then!',
				                	name: 'Bob',
				                	time_ago: '4 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'Butcher echo park wayfarers street art leggings vinyl viral mlkshk',
				                	name: 'Bob',
				                	time_ago: '5 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'How cool is it to have the map of 1940!',
				                	name: 'JohnDoe',
				                	time_ago: '5 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'I found my great grandfather who lived in Bushwick',
				                	name: 'Susan',
				                	time_ago: '6 hours'
				                },
				                {
				                	url:'http://localhost:5000/results?token=qdhgnjgpkkr4j4do7jr4fxigi4',
				                	content:'It’s amazing how much has changed since then!',
				                	name: 'Bob',
				                	time_ago: '1 day'
				                }
				               ];
				// end remove
				if ('stories' in data) {
					addStories(data.stories);
				}
			}

		});

	}
	//-74.4234,40.3984,-73.5212,41.0053
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
				
				log(wax.mm);
				
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
	}
	
	function addStories(stories) {
		for (var i=0;i<stories.length;++i) {
			var story = stories[i];
			var str = '<div class="annotation"><p class="content">'+story.content+'</p><p class="author">Posted by <strong>'+story.name+'</strong> <a href="'+story.url+'" class="hl">'+story.time_ago+' ago</a></p></h4>';
			$("#annotations").append(str);
		}
	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});