define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;
	
	function _init() {
		EDcall(getUrlVar('token'));
	}

	function EDcall(token, arr, city_id) {
		$.getJSON(urlpath + '/locations/' + token + '.json?callback=?', function(data) {
			var cross_string = ""
			for (var i = 0; i < data.cross_streets.length; i++) {
				cross_string += "<option value='" + data.cross_vals[i] + "'>" + 
					 data.cross_streets[i] + "</option>";
			}
			$('.crossstreets').append(cross_string);

			var results = "";
			for (i = 0; i < data.eds.length; i++) {
				results += "<a class='EDcontent' href='http://www.archives.gov'>" + 
					 data.fullcity_id + "-" + data.eds[i] + "</a>";
			}
			$('#EDlist').append(results);

			CSResolve(data.eds, data.fullcity_id, results, cross_string);
			showMap(data.coordinates.lat,data.coordinates.lng,'nyplmap','http://a.tiles.mapbox.com/v3/nypllabs.nyc1940.jsonp',"<a href='http://www.nypl.org/locations/schwarzman/map-division/fire-insurance-topographic-zoning-property-maps-nyc' title='open in new window' target='_blank'>More maps in the Lionel Pincus & Princess Firyal Map Division</a>");
			showMap(data.coordinates.lat,data.coordinates.lng,'gmap','http://a.tiles.mapbox.com/v3/mapbox.mapbox-streets.jsonp');
			
			data.cutout = {x:150,y:300,href:"http://1940census.nypl.org.s3.amazonaws.com/testset/p1--large.jpg"};
			showCutout(data.cutout.x,data.cutout.y,data.cutout.href);
		});
	}
	
	function showCutout(x,y,href) {
		$("#cutout .page").css('background', 'url(' + href + ') -' + x + 'px -' + y + 'px');
	}

	function CSResolve(arr, city_id, _results, _crosses) {
		var oldText = "";
		var curr_results = $('#EDlist').text().split(city_id + '-').splice(1);
		var state_results = [_results]; 
		var state_cross = [_crosses];
		var idx = 0;

		$('.crossstreets').change(function(e) {
			if (curr_results.length === 1) {
				e.preventDefault();
				return false;
			}

			var selectVal = $('select.crossstreets option:selected').val();
			var selectText = $('select.crossstreets option:selected').text();
			var matched = _.intersection(selectVal.split(','), arr, curr_results);

			var cross_string = "";
			var results = "";
			var new_matched = [];

			$('select.crossstreets option').each(function() {
				new_matched = _.intersection(matched, $(this).val().split(','));			

				if (_.isEmpty(new_matched) || oldText === $(this).text()) {
					return true;
				}
				else {
					if (selectText === $(this).text()) {
						cross_string += "<option selected=selected value='" + $(this).val() + "'>" + $(this).text() + "</option>";
					}
					else {
						cross_string += "<option value='" + $(this).val() + "'>" + $(this).text() + "</option>";
					}
				}
			});

			for(var i = 0; i < matched.length; i++) {
				results += "<a class='EDcontent' href='http://www.archives.gov'>" + 
					city_id + "-" + matched[i] + "</a>";
			}

			$('a', '#EDlist').remove();
			$('#EDlist').append(results);

			$('option', $(this)).remove();
			$(this).append(cross_string);

			oldText = selectText;
			curr_results = $('#EDlist').text().split(city_id + '-').splice(1);
			$('.streetchoices').append("<p class='crosscheck'><a href='#'>x </a>" + selectText + "</p>");
			state_results.push(results);
			state_cross.push(cross_string);			
		});


		$('.streetchoices').on('click', '.crosscheck a', function(e) {
			e.preventDefault();
			idx = $(this).parent().index();

			results = state_results[idx];
			cross_string = state_cross[idx];

			$('a', '#EDlist').remove();
			$('#EDlist').append(results);

			$('option', $('select.crossstreets')).remove();
			$('.crossstreets').append(cross_string);
			if (idx === 0) {
				$('.crossstreets').prepend('<option selected=selected>Select cross/back street</option>');
			};

			$('.streetchoices p').each(function(i) {
				if (i >= idx) {
					state_results.pop();
					state_cross.pop();
					$(this).remove();
				}
			});

			curr_results = $('#EDlist').text().split(city_id + '-').splice(1);
			oldText = $('select.crossstreets option:selected').text();
		});

	}

	function showMap(lat, lon, divid, tileset, attribution) {
		if (attribution==undefined) attribution = '';
		//var lat = 40.721;
		//var lon = -73.979;
		wax.tilejson(tileset,
			function(tilejson) {
				var map = new L.Map(divid, {zoomControl: false, trackResize: false}).addLayer(
					new wax.leaf.connector(tilejson))
					.setView(new L.LatLng(lat, lon), 15);
				var centerMarker;
				if (attribution!='') {
					map.attributionControl.addAttribution(attribution);
					var CensusIcon = L.Icon.extend({
						iconUrl: 'images/marker.png',
						shadowUrl: 'images/marker-shadow.png',
						iconSize: new L.Point(43, 35),
						shadowSize: new L.Point(43, 35),
						iconAnchor: new L.Point(11, 35),
						popupAnchor: new L.Point(-3, -76)
					});
					var markerIcon = new CensusIcon();
					centerMarker = new L.Marker(new L.LatLng(lat, lon), {icon: markerIcon});
				} else {
					centerMarker = new L.Marker(new L.LatLng(lat, lon));
				}
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