define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;
	
	function _init() {
		EDcall(getUrlVar('token'));
	}

	function EDcall(token) {
		$.getJSON(urlpath + '/locations/' + token + '.json?callback=?', function(data) {
			var cross_string = ""
			for (var i = 0; i < data.cross_streets.length; i++) {
				cross_string += "<option value='" + data.cross_vals[i] + "'>" + 
					 data.cross_streets[i] + "</option>";
			}
			$('.crossstreets').append(cross_string);

			var results = "";
			for (i = 0; i < data.eds.length; i++) {
				results += "<a href='http://www.archives.gov' title='Find the Census Record for this ED number in the National Archives'>" + 
					 data.fullcity_id + "-" + data.eds[i] + "</a>";
			}
			$('#EDlist').append(results);
			showMaps();
		});
	}
	
	function showMaps() {
		var lat = 40.721;
		var lon = -73.979;
		wax.tilejson('http://a.tiles.mapbox.com/v3/nypllabs.1940topo.jsonp',
			function(tilejson) {
				var map = new L.Map('nyplmap', {zoomControl: false, trackResize: false}).addLayer(
					new wax.leaf.connector(tilejson))
					.setView(new L.LatLng(lat, lon), 14);
				map.attributionControl.addAttribution("Map &copy; USGS");
				var CensusIcon = L.Icon.extend({
					iconUrl: 'images/marker.png',
					shadowUrl: 'images/marker-shadow.png',
					iconSize: new L.Point(43, 35),
					shadowSize: new L.Point(43, 35),
					iconAnchor: new L.Point(11, 35),
					popupAnchor: new L.Point(-3, -76)
				});
				var markerIcon = new CensusIcon();
				var centerMarker = new L.Marker(new L.LatLng(lat, lon), {icon: markerIcon});
				map.addLayer(centerMarker);
				
				// disable interaction
				map.dragging.disable();
				map.touchZoom.disable();
				map.scrollWheelZoom.disable();
				map.doubleClickZoom.disable();
			}
		);
	}

	function getUrlVar(key){
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
		return result && unescape(result[1]) || ""; 
	}


	/** Return instantiated function */
	return {
		init: _init(),
	};
});