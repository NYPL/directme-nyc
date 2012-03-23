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
				$.post(urlpath + '/stories.json?callback=?', {author: author, content: content, location: location, page_idx: page_idx, token: getUrlVar('token')}, function(data) {
					if ('content' in data) {
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
		$.getJSON(urlpath + '/locations/' + token + '.json?callback=?', function(data) {

			if (data !== undefined) {

				if (data.eds.length > 1) {
					$("#results .EDmore1").show();
				} else if (data.eds.length == 1) {
					$("#results .EDonly1").show();
				} else {
					$("#results .EDnone").show();
				}

				var cross_string = "";
				if ('cross_streets' in data && 'cross_vals') {
					cross_string = "";
					for (var i = 0; i < data.cross_streets.length; i++) {
						cross_string += "<option value='" + data.cross_vals[i] + "'>" + 
							 data.cross_streets[i] + "</option>";
					}
					$('.crossstreets').append(cross_string);
				}

				var results = "";
				if ('eds' in data && 'fullcity_id' in data) {
					for (i = 0; i < data.eds.length; i++) {
						results += "<a class='EDcontent' href='http://1940census.archives.gov/'>" + 
							 data.fullcity_id + "-" + data.eds[i] + "</a>";
					}
					$('#EDlist').append(results);

					CSResolve(data.eds, data.fullcity_id, results, cross_string);
				}

				if ('coordinates' in data) {
					showMap(data.coordinates.lat,data.coordinates.lng,'nyplmap','http://a.tiles.mapbox.com/v3/nypllabs.nyc1940-16.jsonp',"<a href='http://www.nypl.org/locations/schwarzman/map-division/fire-insurance-topographic-zoning-property-maps-nyc' title='open in new window' target='_blank'>Find more maps in the Lionel Pincus & Princess Firyal Map Division</a>");
					showMap(data.coordinates.lat,data.coordinates.lng,'gmap','http://a.tiles.mapbox.com/v3/mapbox.mapbox-streets.jsonp');
				}

				if ('cutout' in data) {
					showCutout(parseInt(data.cutout.x),parseInt(data.cutout.y),data.cutout.href);
				}

				if ('stories' in data) {
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
		var cross_string = "";

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

			$('select.crossstreets option').each(function() {
				new_matched = _.intersection(matched, $(this).val().split(','));			

				if (_.isEmpty(new_matched) || oldText === $(this).text()) {
					return true;
				}
				else {
					if (selectText === $(this).text()) {
						//cross_string += "<option selected=selected value='" + $(this).val() + "'>" + $(this).text() + "</option>";
					}
					else {
						cross_string += "<option value='" + $(this).val() + "'>" + $(this).text() + "</option>";
					}
				}
			});
			
			cross_string = '<option selected="selected" value="_">Select another cross/back street</option>' + cross_string;

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
			
			// remove the SELECT if there is only 1 ED
			if (matched.length==1) {
				$('select.crossstreets').hide();
			}
		});


		$('.streetchoices').on('click', '.crosscheck a', function(e) {
			// show the cross street select
			$('select.crossstreets').show();
			
			e.preventDefault();
			idx = $(this).parent().index();
			
			log('1: ' + e);
			log('2: ' + idx);
			log('3: ' + state_results);
			log('4: ' + results);
			log('5: ' + state_cross);
			log('6: ' + cross_string);

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
		wax.tilejson(tileset,
			function(tilejson) {
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