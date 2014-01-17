define(['handlebars', 'app/translations', 'app/config'], function ( Handlebars, translations, config ) {
	return {
		page : function ( html, target ) {
			var template = Handlebars.compile(html);
			var context = $.extend({}, translations, config);
			$('.active').removeClass('active');
			$('[data-target="' + target + '"]').parent("li").addClass('active');
			$("#container").html(template(context));
			$('[data-hide-on*=' + window.page + ']').removeClass("hidden");
			window.page = target;
			$('[data-target="' + target + '"]').addClass("active");
			$('[data-hide-on*="' + target + '"]').addClass("hidden");
			$('[data-show-on*="' + target + '"]').removeClass("hidden");
			$('li:not([data-show-on="' + target + '"])').each( function ( index, element ) {
				if ( $(element).attr("data-show-on").length > 0 ) {
					$(element).addClass("hidden");
				}
			} );
		},

		getPage : function ( host ) {
			  var State = History.getState();
		      var url = State.url;
		      return url.replace(host, "");
		}
	}
});