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
			}

		});

	}
	
	function showLocations(loc) {
		wax.tilejson('http://a.tiles.mapbox.com/v3/nypllabs.NYC1940.jsonp',
			function(tilejson) {
				var map = new L.Map('bigmap', {zoomControl: false, trackResize: false}).addLayer(
					new wax.leaf.connector(tilejson));
				
				var CensusIcon = L.Icon.extend({
					iconUrl: 'images/marker.png',
					shadowUrl: 'images/marker-shadow.png',
					iconSize: new L.Point(43, 35),
					shadowSize: new L.Point(43, 35),
					iconAnchor: new L.Point(11, 35),
					popupAnchor: new L.Point(-3, -76)
				});
				
				var markerIcon = new CensusIcon();
				
				// add markers
				for (var i=0;i<loc.length;++i) {
					var it = loc[i];
					var m = new L.Marker(new L.LatLng(it.coordinates.lat, it.coordinates.lng), {icon: markerIcon});
					map.addLayer(m);
				}
				
				// center on last marker
				//map.setView(new L.LatLng(loc[loc.length-1].coordinates.lat, loc[loc.length-1].coordinates.lng), 11);
				map.setView(new L.LatLng(40.6537555, -73.95618569999999), 11);
				
				
				map.attributionControl.addAttribution("<a href='http://www.nypl.org/locations/schwarzman/map-division/fire-insurance-topographic-zoning-property-maps-nyc' title='open in new window' target='_blank'>More maps in the Lionel Pincus & Princess Firyal Map Division</a>");
				
				// disable zooming interaction
				map.dragging.disable();
				map.touchZoom.disable();
				map.scrollWheelZoom.disable();
				map.doubleClickZoom.disable();
			}
		);
	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});