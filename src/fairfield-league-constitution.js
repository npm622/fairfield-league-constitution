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
				$( '#sidebar' ).affix( {
					offset : {
						top : $( 'header' ).height()
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
						return elem.addClass( 'active' );
					},
					'out' : function() {
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

	 @@templateCache
}());
