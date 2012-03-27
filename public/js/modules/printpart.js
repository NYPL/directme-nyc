define(['jquery'], function($) {

	function _init() {
		doPrint();
	}

	function doPrint(selector) {
		var print_window = window.open();
		var print_document = selector.clone();

		print_window.document.open();
		print_window.document.write(print_document.html());
		print_window.document.close();
		print_window.print();
		print_window.close();
	}

	return {
		init: _init()
	};

});