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