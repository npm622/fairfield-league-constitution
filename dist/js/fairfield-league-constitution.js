(function() {
	'use strict';

	function FlcCtrl() {
		var vm = this;
	}

	angular.module( 'app.fairfieldLeagueConstitution', [ 'ui.router' ] )

	.config( function config($stateProvider) {
		$stateProvider.state( 'fairfieldLeagueConstitution', {
			url : '/fairfieldLeagueConstitution',
			templateUrl : 'fairfield-league-constitution.tmpl.html',
			controller : 'FlcCtrl',
			controllerAs : 'flc',
			data : {
				pageTitle : 'fairfield league constitution'
			}
		} );
	} )

	.directive( 'scrollSpy', function($window) {
		return {
			restrict : 'A',
			scope : {},
			controller : 'ScrollSpyCtrl',
			controllerAs : 'scrollSpy',
			bindToController : true,
			link : function($scope, elem, attrs, scrollSpy) {
				console.log( 'banner height: ' + $( '#banner' ).height() );
				$( '#sidebar' ).affix( {
					offset : {
						top : 400
					}
				} );

				var spyElems = [];

				$scope.$watch( "scrollSpy.spies", function(spies) {
					var results = [];
					var len = spies.length;
					var i;
					for ( i = 0; i < len; i++ ) {
						var spy = spies[i];

						if ( spyElems[spy.id] == null ) {
							results.push( spyElems[spy.id] = elem.find( '#' + spy.id ) );
						}
					}
					return results;
				} );

				return $( $window ).scroll( function() {
					var highlightSpy = null;
					var ref = scrollSpy.spies;
					var len = ref.length;
					var i;
					for ( i = 0; i < len; i++ ) {
						var spy = ref[i];
						spy.out();

						var pos;
						if ( (pos = spyElems[spy.id].offset().top) - $window.scrollY <= 0 ) {
							spy.pos = pos;

							if ( highlightSpy == null ) {
								highlightSpy = spy;
							}

							if ( highlightSpy.pos < spy.pos ) {
								highlightSpy = spy;
							}
						}
					}

					if ( $( window ).scrollTop() + $( window ).height() >= $( document ).height() ) {
						spy.pos = pos;
						highlightSpy = spy;
					}

					return highlightSpy != null ? highlightSpy["in"]() : void 0;
				} );
			}
		}
	} )

	.directive( 'spy', function($location, $anchorScroll) {
		return {
			resrict : 'A',
			require : '^scrollSpy',
			link : function($scope, elem, attrs, scrollSpy) {
				elem.click( function() {
					$location.hash( attrs.spy );
					$anchorScroll();
				} );

				scrollSpy.addSpy( {
					id : attrs.spy,
					'in' : function() {
						// return elem.addClass( 'current' );
						return elem.addClass( 'active' );
					},
					'out' : function() {
						// return elem.removeClass( 'current' );
						return elem.removeClass( 'active' );
					}
				} );
			}
		}
	} )

	.controller( 'FlcCtrl', [ FlcCtrl ] )

	.controller( 'ScrollSpyCtrl', [ '$scope', ScrollSpyCtrl ] );

	function FlcCtrl() {
		var vm = this;
	}

	function ScrollSpyCtrl() {
		var vm = this;

		vm.spies = [];

		vm.addSpy = function(spy) {
			vm.spies.push( spy );
		};
	}

	 angular.module("app.fairfieldLeagueConstitution").run(["$templateCache", function($templateCache) {$templateCache.put("fairfield-league-constitution.tmpl.html","<div class=\"masthead\" id=\"banner\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-5\">\n                <img ng-src=\"http://placecorgi.com/600/400\" alt=\"placeholder\" width=\"600\" height=\"400\">\n            </div>\n            <div class=\"col-md-7\">\n                <h1>\n                    fairfield football club\n                    <p class=\"lead\">a league constitution</p>\n                </h1>\n                <em>created on thursday, the twenty-fifth of july in god\'s year of two thousand and thirteen</em>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"container\">\n    <div class=\"row\" scroll-spy>\n        <div class=\"col-md-3 sidebar\">\n            <ul class=\"nav nav-stacked affix\" id=\"sidebar\">\n                <li spy=\"preamble\">preamble</li>\n                <li spy=\"sec1\">section 1</li>\n                <li spy=\"sec2\">section 2</li>\n                <li spy=\"sec3\">section 3</li>\n                <li spy=\"sec4\">section 4</li>\n            </ul>\n        </div>\n        <div class=\"col-md-9 content\">\n\n            <hr />\n            <h2 id=\"preamble\">preamble</h2>\n            we the people of the fairfield football club fantasy football league, in order to form a more perfect union of sarcastically aggressive banter\n            amongst peers and grudgingly difficult transactions of personal finances, establish justification of smug condenscension at the peoples\' perceived\n            knowledge of the game of american football, insure domestic tranquility on the sundays, mondays, and occasional thursday and saturday that the\n            people of the league must keep sacred, provide for the common defence and offence with which the teams of the people prove their worth, promote the\n            general welfare of all players of the game of american football so they may remain free of heinous crime and veinous drug as they currently do so\n            exist, and secure the blessings of victory to thine self and thine own posterity, do ordain and establish this constitution for the fantasy football\n            league of the fairfield football club.\n\n\n            <hr />\n            <h2 id=\"sec1\">Content</h2>\n            Rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia\n            voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui\n            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam\n            quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut. Rem aperiam, eaque ipsa quae\n            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n            aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,\n            consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad\n            minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut! Rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n            quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia cor magni\n            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed\n            quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum\n            exercitationem ullam corporis suscipit laboriosam, nisi ut. Rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae\n            vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione\n            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius\n            modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis\n            suscipit laboriosam, nisi ut! Rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo\n            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque\n            porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et\n            dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut. Rem\n            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas\n            sit aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum\n            quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat\n            voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut!\n\n            <hr />\n            <h2 id=\"sec2\">Content</h2>\n            <p>Rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem\n                quia voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n                qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam\n                aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut!</p>\n            <div class=\"row\">\n                <div class=\"col-md-4\">\n                    <img ng-src=\"http://placecorgi.com/720/480\" class=\"img-responsive\">\n                </div>\n                <div class=\"col-md-4\">\n                    <img ng-src=\"http://placecorgi.com/720/480\" class=\"img-responsive\">\n                </div>\n                <div class=\"col-md-4\">\n                    <img ng-src=\"http://placecorgi.com/720/480\" class=\"img-responsive\">\n                </div>\n            </div>\n            <p>Rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem\n                quia voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n                qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam\n                aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut. Rem aperiam,\n                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit\n                aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum\n                quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat\n                voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut! Rem aperiam, eaque ipsa quae ab\n                illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n                aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit\n                amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut\n                enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut. Rem aperiam, eaque ipsa quae ab illo inventore\n                veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed\n                quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,\n                adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,\n                quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut!</p>\n\n            <hr />\n            <h2 id=\"sec3\">Content</h2>\n            mages are responsive sed @mdo but sum are more fun peratis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem\n            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas\n            sit aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum\n            quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat\n            voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut\n\n            <hr />\n            <h2 id=\"sec4\">Content</h2>\n            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo\n            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut\n            fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,\n            consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad\n            minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut\n        </div>\n\n        <hr>\n        <h4>hand rolled on january 21, 2016</h4>\n        <hr>\n    </div>\n</div>\n");}]);
}());
