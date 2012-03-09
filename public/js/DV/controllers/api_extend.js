//inherit main api

//for concepts of pub/sub => observers interacting with module library on project
_.extend(DV.Api.prototype, {

	updateMag : function(jQuery, _event) {
		jQuery.publish(_event, []);
	}

});