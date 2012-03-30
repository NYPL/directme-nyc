define(['jquery', 'modules/social'], function($, social) {

	var urlpath = window.location.protocol + "//" + window.location.host;
	
	var NE = new L.LatLng(41.0053,-74.4234),
    SW = new L.LatLng(40.3984,-73.5212),
    NYCbounds = new L.LatLngBounds(SW, NE);

	function _init() {
		EDcall(getUrlVar('token'));
	}

	function submitStory(page_idx, ifStories) {
		$('#conn_social').on('show', function(e) {
			e.preventDefault();
			var _modal = $('.modal');
			_modal.css('left',($('#main').width()/2) - ($(this).width()/2) + 'px');
		});

		$('#submit').on('click', function(e) {
			e.preventDefault();
			var content = $('#frm-content').val();
			var time_dist = 'just now'
			socialStart();
			social.init(content, time_dist);
		});
	}

	function socialStart() {
		$('#conn_social').modal({
			'show': true,
			'keyboard': false,
			'backdrop': false
		});
	}

	function EDcall(token, arr, city_id) {
		$.getJSON(urlpath + '/api/locations/' + token + '.json?callback=?', function(data) {

			if (typeof data !== 'undefined') {

				environment.borough = data.borough;
				
				$('#newsearch').prop('href',"/viewer/" + data.borough);

				if (data.hasOwnProperty('eds') && data.eds.length > 1) {
					$("#results .EDmore1").show();
				} else if (data.hasOwnProperty('eds') && data.eds.length == 1) {
					$("#results .EDonly1").show();
				} else {
					$("#results .EDnone").show();
				}

				if (data.hasOwnProperty('cross_streets') && data.hasOwnProperty('cross_vals')) {
					var cross_string = "";
					cross_string = "";
					for (var i = 0; i < data.cross_streets.length; i++) {
						cross_string += "<option value='" + data.cross_vals[i] + "'>" + 
							 data.cross_streets[i] + "</option>";
					}
					$('.crossstreets').append(cross_string);
				}

				if (data.hasOwnProperty('eds') && data.hasOwnProperty('fullcity_id')) {
					var results = "";
					for (i = 0; i < data.eds.length; i++) {
						results += "<a class='EDcontent' href='http://1940census.archives.gov/'>" + 
							 data.fullcity_id + "-" + data.eds[i] + "</a>";
					}
					$('#EDlist').append(results);
				}

				CSResolve(data.eds, data.fullcity_id, results, cross_string);

				if (data.hasOwnProperty('coordinates') && data.hasOwnProperty('map_urls')) {
					showMap(data.coordinates.lat,data.coordinates.lng,'gmap',
							data.map_urls[1],
							undefined,
							function() {
								// verify bounds are ok (it's inside NYC)
								if (NYCbounds.contains(new L.LatLng(data.coordinates.lat,data.coordinates.lng))) {
									showMap(data.coordinates.lat,data.coordinates.lng,'nyplmap',
											data.map_urls[0],
											"Map © USGS. <a href='http://www.nypl.org/locations/schwarzman/map-division/fire-insurance-topographic-zoning-property-maps-nyc' title='open in new window' target='_blank'>Find more maps in the Lionel Pincus & Princess Firyal Map Division</a>"
									);
								} else {
									$('#nyplmap').html('<div style="margin:60px 12px;font-size:13px;line-height:1.4em;color:#666;text-align:center;">This address appears to be outside of the New York City metropolitan area. 1940s maps beyond this area are not currently available.</div>');
								}
							});
				}

				else {
					$('#geo').hide();
				}

				if (data.hasOwnProperty('cutout')) {
					var quick_link = urlpath + '/viewer/' + data.borough + '#document/p' + data.cutout.page_idx 
					showCutout(parseInt(data.cutout.x),parseInt(data.cutout.y),data.cutout.href, quick_link);
				}

				else {
					$('#cutout').hide();
				}

				if (data.hasOwnProperty('stories')) {
					var ifStories = _.isEmpty(data.stories);

					if (ifStories === false) {
						for (i = 0; i < data.stories.length; i++) {
							appendStory(data.stories[i].content, data.stories[i].author, data.stories[i].time_ago)
						}
					}
				}


				printMe();
				submitStory(data.cutout.page_idx, ifStories);
			}
		});
	}
	
	function showCutout(x,y,href, quick_link) {
		$("#cutout .cutoutlink").prop('href', quick_link)
		$("#cutout .page").css('background', 'url(' + href + ') ' + (x-20) + 'px ' + y + 'px');
	}

	function CSResolve(arr, city_id, _results, _crosses) {
		if (typeof arr !== 'undefined') {
			loadStreets();
			city_id = environment.fullcity;
		}
		var oldText = "";
		var curr_results = $('#EDlist').text().split(city_id + '-') || Array();
		curr_results.remove(0);
		var state_results = [_results] || Array();
		var state_cross = [_crosses] || Array();
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
			oldText = selectText;

			$('select.crossstreets option').each(function() {
				new_matched = _.intersection(matched, $(this).val().split(','));

				if (_.isEmpty(new_matched) || oldText === $(this).text()) {
					return true;
				}
				else {
					cross_string += "<option value='" + $(this).val() + "'>" + $(this).text() + "</option>";
				}
			});
			
			fin_string = '<option selected="selected" value="_">Select another cross/back street</option>' + cross_string;

			for(var i = 0; i < matched.length; i++) {
				results += "<a class='EDcontent' target='_blank' href='http://1940census.archives.gov/'>" + city_id + "-" + matched[i] + "</a>";
			}

			$('a', '#EDlist').remove();
			$('#EDlist').append(results);

			$('option', $(this)).remove();
			$(this).append(fin_string);

			curr_results = $('#EDlist').text().split(city_id + '-');
			curr_results.remove(0);

			$('.streetchoices').append("<p class='crosscheck'><a href='#'>x </a>" + selectText + "</p>");
			state_results.push(results);
			state_cross.push(fin_string);
			
			// remove the SELECT if there is only 1 ED
			if (matched.length==1) {
				$('select.crossstreets').hide();
			}
		});


		$('.streetchoices').on('click', '.crosscheck a', function(e) {
			// show the cross street select
			$('select.crossstreets').show();
			
			idx = $(this).parent().index();
			
			var c_results = state_results[idx];
			var c_cross_string = state_cross[idx];

			$('a', '#EDlist').remove();
			$('#EDlist').append(c_results);

			$('option', $('select.crossstreets')).remove();
			$('.crossstreets').append(c_cross_string);
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

			curr_results = $('#EDlist').text().split(city_id + '-');
			curr_results.remove(0);
			oldText = $('select.crossstreets option:selected').text();
		});

	}

	function showMap(lat, lon, divid, tileset, attribution, callback, canZoom) {
		if (typeof attribution === 'undefined') attribution = '';
		if (typeof canZoom === 'undefined') canZoom = false;
		wax.tilejson(tileset,
			function(tilejson) {
				var map = new L.Map(divid, {zoomControl: canZoom, trackResize: false}).addLayer(
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
				//map.dragging.disable();
				map.touchZoom.disable();
				if (!canZoom) map.scrollWheelZoom.disable();
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

	function printMe() {
		$('a.printme').on('click', function() {
			window.print();
		});
	}

	function loadStreets() {
		$.getJSON(urlpath + '/api/streets/' + environment.borough + '.json?callback=?', function(data) {
			environment.fullcity = data.fullcity;
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});