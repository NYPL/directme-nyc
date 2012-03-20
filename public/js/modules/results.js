define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;

	function _init() {
		EDcall(getUrlVar('token'));

		Array.prototype.remove = function(from, to) {
			var rest = this.slice((to || from) + 1 || this.length);
			this.length = from < 0 ? this.length + from : from;
			return this.push.apply(this, rest);
		};

	}

	function EDcall(token, arr, city_id) {
		$.getJSON(urlpath + '/locations/' + token + '.json?callback=?', function(data) {
			var cross_string = ""
			for (var i = 0; i < data.cross_streets.length; i++) {
				cross_string += "<option value='" + data.cross_vals[i] + "'>" + 
					 data.cross_streets[i] + "</option>";
			}
			$('.crossstreets').append(cross_string);

			var results = ""
			for (i = 0; i < data.eds.length; i++) {
				results += "<tr><td class='EDnumber'><a href='http://www.archives.gov'>" + 
					 data.fullcity_id + "-" + data.eds[i] + "</a></td></tr>";
			}
			$('#EDlist').append(results);

			CSResolve(data.eds, data.fullcity_id, results, cross_string);
		});
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
				results += "<tr><td class='EDnumber'><a href='http://www.archives.gov'>" + 
					city_id + "-" + matched[i] + "</a></td></tr>";
			}

			$('tr', '#EDlist').remove();
			$('#EDlist').append(results);

			$('option', $(this)).remove();
			$(this).append(cross_string);

			oldText = selectText;
			curr_results = $('#EDlist').text().split(city_id + '-').splice(1);
			$('.streetchoices').append("<p class='crosscheck'><a href='#'>x</a>" + selectText + "</p>");
			state_results.push(results);
			state_cross.push(cross_string);

			for (var n = 0; n < state_results.length; n++) {
				log(state_results[n]);
				log(state_results.length)
			}
			
		});


		$('.streetchoices').on('click', '.crosscheck a', function(e) {
			e.preventDefault();
			idx = $(this).parent().index();

			results = state_results[idx];
			cross_string = state_cross[idx];


			$('tr', '#EDlist').remove();
			$('#EDlist').append(results);

			$('option', $('select.crossstreets')).remove();
			$('.crossstreets').append(cross_string);
			if (idx === 0) {
				$('.crossstreets').prepend('<option selected=selected>Select cross/back street</option>');
			};

			var count = 0;
			$('.streetchoices p').each(function (i) {
				if (i >= idx) {
					count++;
					$(this).remove();
				}
			});
			if (count <= idx) {
				log("fjlj")
				state_results.remove(idx, idx - count)
				state_cross.remove(idx, idx - count)
			}
			else {
				state_results.remove(idx+1, count)
				state_cross.remove(idx+1, count)
			}

			curr_results = $('#EDlist').text().split(city_id + '-').splice(1);
			oldText = $('select.crossstreets option:selected').text();
			log(state_results);
		});

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