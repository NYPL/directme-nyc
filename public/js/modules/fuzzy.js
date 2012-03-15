define(['jquery'], function($) {
	var urlpath = window.location.protocol + "//" + window.location.host;

	function _init() {
		loadContent();
	}

	function onSubmitModal(site) {
		$('#submitED').on('click', function(e) {
			e.preventDefault();
			var number = $('#frm-modal-number').val() || null;
			var name = $('#frm-modal-name').val() || null;
			var borough = environment.borough;
			var state = $('#state_hidden').val();
			var fullcity = $('#fullcity_hidden').val();
			var streetName = $('#frm-modal-street').val() || null;

			if (streetName !== null && state !== null && fullcity !== null && $.inArray(streetName, environment.streets) > -1) {
				$.post(site + '/locations.json?callback=?', {name: name, number: number, street: streetName, borough: borough, state: state, fullcity: fullcity}, function(data) {
					window.location.href = '/results?token=' + data.token;
				}, "json");
			}
		});
	}

	function matchStreets(input) {
		var trimmed = input.replace(/\s/,'');
		var reg = new RegExp(trimmed.split('').join('[^\\n]*'), 'i');
		return environment.streets.filter(function(st) {
			if (st.match(reg)) {
				return st;
			}
		});
	}

	function callback(req, resp) {
		var filtered = matchStreets(req.term);
		resp(filtered);
	}

	function loadContent() {
		//just for testing
		if (environment.borough === 'testset') {
			environment.borough = 'brooklyn'
		}
		//testing is now complete

		$.getJSON(urlpath + '/streets/' + environment.borough + '.json?callback=?', function(data) {
			environment.streets = data.streets;
			$('#state_hidden').val(data.state);
			$('#fullcity_hidden').val(data.fullcity);
		});
	}

	function autoCompleteO() {
		$("#frm-modal-street").autocomplete({
			source: callback
		});

		$('.ui-autocomplete').on('click', function() { 
			var streetName = $('#frm-modal-street').val() || null;
			if ($.inArray(streetName, environment.streets) > -1) {
				$('#submitED').removeClass('disabled');
			}
			else {
				$('#submitED').addClass('disabled');
			}			
		});

		$('#frm-modal-street').on('keyup', function() {
			var streetName = $('#frm-modal-street').val() || null;
			if ($.inArray(streetName, environment.streets) > -1) {
				$('#submitED').removeClass('disabled');
			}
			else {
				$('#submitED').addClass('disabled');
			}			
		});

		onSubmitModal(urlpath);
	}

	/** Return instantiated function */
	return {
		init: _init,
		search: autoCompleteO
	};
});