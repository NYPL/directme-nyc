define(['jquery'], function($) {
	TypekitConfig = {
		kitId: 'adp0eod'
	};

	(function() {
		$.ajax({
			url: '//use.typekit.com/' + TypekitConfig.kitId + '.js',
			dataType: 'script',
			cache: true,
			success: function() {
				try { Typekit.load(TypekitConfig); } catch (e) {}
			}
		});
	})();
});
