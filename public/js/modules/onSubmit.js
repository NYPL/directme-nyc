define(['jquery'], function($) {

	function _init() {
		//values
		var number = $('#frm-modal-number').val();
		var streetName = $('#frm-modal-street').val();
	}

	/** Return instantiated function */
	return {
		init: _init
	};
});