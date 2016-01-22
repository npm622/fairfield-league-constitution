(function() {
	'use strict';

	function FlcCtrl() {
		var vm = this;
	}

	angular.module( 'app.fairfieldLeagueConstitution', [ 'ui.router' ] )

	.config( function config($stateProvider) {
		$stateProvider.state( 'fairfieldLeagueConstitution', {
			url : '/fairfieldLeagueConstitution',
			templateUrl : 'constitution.tmpl.html',
			controller : 'FlcCtrl',
			controllerAs : 'flc',
			data : {
				pageTitle : 'fairfield league constitution'
			}
		} );
	} )

	.controller( 'FlcCtrl', [ FlcCtrl ] );

	function FlcCtrl() {
		var vm = this;
	}

	 angular.module("app.fairfieldLeagueConstitution").run(["$templateCache", function($templateCache) {$templateCache.put("fairfield-league-constitution.tmpl.html","<!-- <!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"UTF-8\">\n<title>league constitution | fairfield league</title>\n</head>\n<body> -->\n\n<div class=\"masthead\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-5\">\n                <img ng-src=\"http://placecorgi.com/720/480\">\n            </div>\n            <div class=\"col-md-7\">\n                <h1>\n                    fairfield league\n                    <p class=\"lead\">league constitution</p>\n                </h1>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-3\" id=\"leftCol\">\n            <ul class=\"nav nav-stacked\" id=\"sidebar\">\n                <li><a href=\"#sec0\">Section 0</a></li>\n                <li><a href=\"#sec1\">Section 0</a></li>\n                <li><a href=\"#sec2\">Section 0</a></li>\n                <li><a href=\"#sec3\">Section 0</a></li>\n                <li><a href=\"#sec4\">Section 0</a></li>\n            </ul>\n        </div>\n        <div class=\"col-md-9\" id=\"mainCol\">\n            <br />\n\n            <hr />\n            <h2 id=\"sec0\">Content</h2>\n            At Bootply we like to build simple Bootstrap templates that utilize the code Bootstap CSS without a lot of customization. Sure you can find a lot of\n            Bootstrap themes and inspiration, but these templates tend to be heavy on customization.\n\n            <hr />\n            <h2 id=\"sec1\">Content</h2>\n            Rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia\n            voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui\n            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam\n            quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut. Rem aperiam, eaque ipsa quae\n            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n            aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,\n            consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad\n            minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut!\n\n            <hr />\n            <h2 id=\"sec2\">Content</h2>\n            <p>Rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem\n                quia voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n                qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam\n                aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut!</p>\n            <div class=\"row\">\n                <div class=\"col-md-4\">\n                    <img ng-src=\"http://placecorgi.com/720/480\" class=\"img-responsive\">\n                </div>\n                <div class=\"col-md-4\">\n                    <img ng-src=\"http://placecorgi.com/720/480\" class=\"img-responsive\">\n                </div>\n                <div class=\"col-md-4\">\n                    <img ng-src=\"http://placecorgi.com/720/480\" class=\"img-responsive\">\n                </div>\n            </div>\n\n            <hr />\n            <h2 id=\"sec3\">Content</h2>\n            mages are responsive sed @mdo but sum are more fun peratis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem\n            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas\n            sit aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum\n            quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat\n            voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut\n\n            <hr />\n            <h2 id=\"sec4\">Content</h2>\n            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo\n            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut\n            fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,\n            consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad\n            minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut\n        </div>\n\n        <hr>\n        <h4>hand rolled on january 21, 2016</h4>\n        <hr>\n    </div>\n</div>\n\n<!-- </body>\n</html> -->");}]);
}());
