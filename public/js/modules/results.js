define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;	

	function _init() {
		EDcall(getUrlVar('token'));
	}

	function submitStory(page_idx, ifStories) {
		$('#fb-submit').on('click', function(e) {

			var content = $('#frm-content').val();
			var time_dist = 'just now'

			//temp
			var author = 'Anonymous'
			//

			var location = {}
			if (content) {
				$.post(urlpath + '/api/stories.json?callback=?', {author: author, content: content, location: location, page_idx: page_idx, token: getUrlVar('token')}, function(data) {
					if (data.hasOwnProperty('content')) {
						$('#frm-content').val('');
						if (ifStories === true) {
							appendStory(content, author, time_dist);
							ifStories = false;
						}
						else {
							prependStory(content, author, time_dist);
						}
					}
				}, "json");
			}
		});
	}

	function EDcall(token, arr, city_id) {
		$.getJSON(urlpath + '/api/locations/' + token + '.json?callback=?', function(data) {

			if (typeof data !== 'undefined') {

				if (data.eds.length > 1) {
					$("#results .EDmore1").show();
				} else if (data.eds.length == 1) {
					$("#results .EDonly1").show();
				} else {
					$("#results .EDnone").show();
				}

				var cross_string = "";
				if (data.hasOwnProperty('cross_streets') && data.hasOwnProperty('cross_vals')) {
					cross_string = "";
					for (var i = 0; i < data.cross_streets.length; i++) {
						cross_string += "<option value='" + data.cross_vals[i] + "'>" + 
							 data.cross_streets[i] + "</option>";
					}
					$('.crossstreets').append(cross_string);
				}

				var results = "";
				if (data.hasOwnProperty('eds') && data.hasOwnProperty('fullcity_id')) {
					for (i = 0; i < data.eds.length; i++) {
						results += "<a class='EDcontent' target='_blank' href='http://1940census.archives.gov/'>" + 
							 data.fullcity_id + "-" + data.eds[i] + "</a>";
					}
					$('#EDlist').append(results);

					CSResolve(data.eds, data.fullcity_id, results, cross_string);
				}

				if (data.hasOwnProperty('coordinates') && data.hasOwnProperty('map_urls')) {
					log(data);
					showMap(data.coordinates.lat,data.coordinates.lng,'nyplmap',
						data.map_urls[0],
						"<a href='http://www.nypl.org/locations/schwarzman/map-division/fire-insurance-topographic-zoning-property-maps-nyc' title='open in new window' target='_blank'>Find more maps in the Lionel Pincus & Princess Firyal Map Division</a>", 
						function() {
							showMap(data.coordinates.lat,data.coordinates.lng,'gmap',
								data.map_urls[1]);
						});
				}

				if (data.hasOwnProperty('cutout')) {
					showCutout(parseInt(data.cutout.x),parseInt(data.cutout.y),data.cutout.href);
				}

				if (data.hasOwnProperty('stories')) {
					var ifStories = _.isEmpty(data.stories);

					if (ifStories === false) {
						for (i = 0; i < data.stories.length; i++) {
							appendStory(data.stories[i].content, data.stories[i].author, data.stories[i].time_ago)
						}
					}
				}
				submitStory(data.cutout.page_idx, ifStories);
			}
		});
	}
	
	function showCutout(x,y,href) {
		$("#cutout .page").css('background', 'url(' + href + ') ' + x + 'px ' + y + 'px');
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

			var results = "";
			var new_matched = [];
			var cross_string = "";

			$('select.crossstreets option').each(function() {
				new_matched = _.intersection(matched, $(this).val().split(','));			

				if (_.isEmpty(new_matched) || oldText === $(this).text()) {
					return true;
				}
				else {
					cross_string += "<option value='" + $(this).val() + "'>" + $(this).text() + "</option>";
				}
			});
			
			cross_string = '<option selected="selected" value="_">Select another cross/back street</option>' + cross_string;

			for(var i = 0; i < matched.length; i++) {
				results += "<a class='EDcontent' target='_blank' href='http://1940census.archives.gov/'>" + city_id + "-" + matched[i] + "</a>";
			}
			
			log(results);

			$('a', '#EDlist').remove();
			$('#EDlist').append(results);

			$('option', $(this)).remove();
			$(this).append(cross_string);

			oldText = selectText;
			curr_results = $('#EDlist').text().split(city_id + '-').splice(1);
			$('.streetchoices').append("<p class='crosscheck'><a href='#'>x </a>" + selectText + "</p>");
			state_results.push(results);
			state_cross.push(cross_string);
			
			// remove the SELECT if there is only 1 ED
			if (matched.length==1) {
				$('select.crossstreets').hide();
			}
		});


		$('.streetchoices').on('click', '.crosscheck a', function(e) {
			// show the cross street select
			$('select.crossstreets').show();
			
			var cross_string = "";

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

	function showMap(lat, lon, divid, tileset, attribution, callback) {
		if (typeof attribution === 'undefined') attribution = '';
		wax.tilejson(tileset,
			function(tilejson) {
				log("json", tilejson)
				var map = new L.Map(divid, {zoomControl: false, trackResize: false}).addLayer(
					new wax.leaf.connector(tilejson))
					.setView(new L.LatLng(lat, lon), 16);
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

				if (typeof callback !=='undefined') {
					callback();
				}
			}
		);
	}
	
	function getUrlVar(key){
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
		return result && unescape(result[1]) || ""; 
	}

	function appendStory(content, author, time_dist) {
		$("<div class='annotation'><p class='content'>" + content + "</p><p class='author'>Posted by <strong>" + author + "</strong> " + time_dist + "</p></div>").appendTo('#frm-annotate')
	}

	function prependStory(content, author, time_dist) {
		$("<div class='annotation'><p class='content'>" + content + "</p><p class='author'>Posted by <strong>" + author + "</strong> " + time_dist + "</p></div>").prependTo('div.annotation:first')
	}


	/** Return instantiated function */
	return {
		init: _init()
	};
});