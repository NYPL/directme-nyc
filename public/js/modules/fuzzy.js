
function fuzzy() {

	var urlpath = window.location.protocol + "//" + window.location.host;

	//init method for module
	function _init() {
		loadContent();
		addPopovers();
	}

	//add twitter bootstrap Popups for Modal
	function addPopovers() {
		var namePop = {title:"Person Name", content:"The name of the person <em>as you see it</em> in the phone book. This field is optional."};
		var numberPop = {title:"Address number", content:"e.g.: Type '1178' (no quotes) if address is '1178RemsnAv'."};
		var streetPop = {title:"Street name", content:"e.g.: Type 'RemsnAv' (no quotes) if address is '1178RemsnAv'. Make sure to select a <em>non-abbreviated</em> name."};
		$('#frm-pop-name').popover({placement:"right",trigger:"hover",title:namePop.title,content:namePop.content});
		$('#frm-pop-number').popover({placement:"right",trigger:"hover",title:numberPop.title,content:numberPop.content});
		$('#frm-pop-street').popover({placement:"right",trigger:"hover",title:streetPop.title,content:streetPop.content});
		$('#frm-modal-name').popover({placement:"right",trigger:"focus",title:namePop.title,content:namePop.content});
		$('#frm-modal-number').popover({placement:"left",trigger:"focus",title:numberPop.title,content:numberPop.content});
		$('#frm-modal-street').popover({placement:"right",trigger:"focus",title:streetPop.title,content:streetPop.content});
	}

	//when submit is clicked on the modal obatain info and make a post to the api
	function onSubmitModal(page_idx) {
		$('#submitED').on('click', function(e) {
			e.preventDefault();
			var noSearch = false;
			var number = $('#frm-modal-number').val() || null;
			var name = $('#frm-modal-name').val() || null;
			var boro = environment.borough;
			var state = $('#state_hidden').val() || environment.state;
			var fullcity = $('#fullcity_hidden').val() || environment.fullcity;
			var streetName = $('#frm-modal-street').val().toLowerCase() || null;
			var noResultsName = $('#frm-modal-noresults').val() || null;
			var checkDisabled = $(this).hasClass('disabled');

			if (typeof ie === 'undefined' || ie >= 9) {
				var theXY = $('.active-loupe').find('.thejloupeview').css('backgroundPosition').split(" ");
				var positions = [theXY[0],theXY[1]];
			}
			else {
				var X = $('.active-loupe').find('.thejloupeview').css('background-position-x');
				var Y = $('.active-loupe').find('.thejloupeview').css('background-position-y');
				var positions = [X,Y]
			}
			var bg_img = $('.active-loupe').find('.thejloupeview').css('backgroundImage').replace(/"/g,"").replace(/url\(|\)$/ig, "");
			var cutout = {x: parseInt(positions[0]), y: parseInt(positions[1]), href: bg_img, page_idx: page_idx};

			if (streetName === null && noResultsName !== null) {
				streetName = $('#frm-modal-noresults').val().toLowerCase();
				noSearch = true;
			}

			if (streetName !== null && checkDisabled !== true) {
				$.post(urlpath + '/api/locations.json?callback=?', {name: name, number: number, street: streetName, borough: boro, state: state, fullcity: fullcity, cutout: cutout, noSearch: noSearch}, function(data) {
					window.location.href = '/results?token=' + data.token;
				}, "json")
				.error(function() { 
					 appendModalError();
				});
			}
		});
	}

	//give an error when the fuzzy search is unsuccessful
	function appendModalError() {
		$("<div class='post_error'><p> Search Unsuccessful. Try Again Later </p>").prependTo('.frm-modal-help')
		setTimeout(function() {
			$('.post_error').fadeOut().empty();
		}, 30000);
	}

	function matchStreets(input) {
		// check for N1 W1 E1 S1
		if (input != '' && input.length>=2) {
			if (isNaN(input[0]) && !isNaN(input.substr(1))) {
				// first: letter second-fwd: number
				// assuming no letters after the number (N10 but not N10St or N10th)
				input = input.substr(1) + "" + input[0];
			}
		}
		var trimmed = input.replace(/\s/,'');
		var reg = new RegExp(trimmed.split('').join('[^\\n]*'), 'i');
		return environment.streets.filter(function(st) {
			if (st.match(reg)) {
				return st;
			}
		});
	}

	function matchFirst(valChar) {
		var reg = new RegExp('^' + valChar, 'i');
		return environment.streets.filter(function(st) {
			if (st.match(reg)) {
				return st;
			}
		});
	}

	function capitalize(str) {
		var aa = str.split(" ");
		var i, l=aa.length;
		for (i=0; i<l; ++i) {
			aa[i] = aa[i].replace(/^\w/, function($0) { return $0.toUpperCase(); })
		}
		return aa.join(" ");
	}

	function callback(req, resp) {
		var filtered = matchStreets(req.term);
		if (filtered.length < 1) {
			filtered = matchFirst(req.term.charAt(0));
		}
		filtered = _.map(filtered, function(i) {
			return capitalize(i);
		})
		resp(filtered);
	}

	//load the borough streets information
	function loadContent() {
		$.getJSON(urlpath + '/api/streets/' + environment.borough + '.json?callback=?', function(data) {
			environment.streets = data.streets;
			$('#state_hidden').val(data.state);
			$('#fullcity_hidden').val(data.fullcity);
			environment.state = data.state;
			environment.fullcity = data.fullcity;
		});
	}

	//run the autocomplete, jquery-ui method, check for no results, keyup, click. Once Instantiated, instantiate the onSubmitModal event method
	//the source for autocomplete method is the callback, referenced above
	function autoCompleteO(page_idx) {
		$("#frm-modal-street").autocomplete({
			source: callback
		});

		$('.ui-autocomplete').on('click', function() {
			$('#frm-modal-noresults').val(''); 
			var streetName = $('#frm-modal-street').val().toLowerCase() || null;
			if (_.include(environment.streets, streetName)) {
				$('#submitED').removeClass('disabled');
				$('#submitED').html('Find ED number for this address');
			}
			else {
				$('#submitED').addClass('disabled');
				$('#submitED').html('Type/select a non-abbreviated street');
			}			
		});

		$('#frm-modal-street').on('keyup', function() {
			$('#frm-modal-noresults').val('');
			var streetName = $('#frm-modal-street').val().toLowerCase() || null;
			if (_.include(environment.streets, streetName)) {
				$('#submitED').removeClass('disabled');
				$('#submitED').html('Find ED number for this address');
			}
			else {
				$('#submitED').addClass('disabled');
				$('#submitED').html('Type/select a non-abbreviated street');
			}			
		});

		$('#frm-modal-noresults').on('keyup', function() {
			$('#frm-modal-street').val('');
			$('#submitED').removeClass('disabled');			
			$('#submitED').html('Find ED number for this address');
		});

		onSubmitModal(page_idx);
	}

	/** Return instantiated function */
	return {
		init: _init,
		autoCompleteO: autoCompleteO
	}
}
