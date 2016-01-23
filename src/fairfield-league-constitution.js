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
				var spyElems = [];

				$scope.$watch( "scrollSpy.spies", function(scrollSpy) {
					var results = [];
					var len = scrollSpy.spies.length;
					var i;
					for ( i = 0; i < len; i++ ) {
						var spy = scrollSpy.spies[i];
						if ( spyElems[spy.id] == null ) {
							results.push( spyElems[spy.id] = elem.find( '#' + spy.id ) );
						} else {
							results.push( void 0 );
						}
					}
					return results;
				} );

				return $( $window ).scroll( function(scrollSpy) {
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
					// TODO: the below might have to be in double quotes
					return highlightSpy != null ? highlightSpy['in']() : void 0;
				} );
			}
		}
	} )

	.directive( 'spy', function() {
		return {
			resrict : 'A',
			require : '^scrollSpy',
			link : function($scope, elem, attrs, scrollSpy) {
				scrollSpy.addSpy( {
					id : attrs.spy,
					'in' : function() {
						return elem.addClass( 'current' );
					},
					'out' : function() {
						return elem.removeClass( 'current' );
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
			return vm.spies.push( spy );
		}
	}

	 @@templateCache
}());
