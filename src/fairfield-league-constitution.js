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
				console.log('inside link function of scrollSpy directive');
				console.log(elem);
				console.log(attrs);
				console.log(scrollSpy);
				var spyElems = [];

				$scope.$watch( "scrollSpy.spies", function(spies) {
					console.log('inside $watch function');
					console.log(spies);
					var results = [];
					var len = spies.length;
					var i;
					for ( i = 0; i < len; i++ ) {
						var spy = spies[i];
						console.log('spyElem');
						if ( spyElems[spy.id] == null ) {
							console.log('if');
							console.log(elem.find('#' + spy.id));
							results.push( spyElems[spy.id] = elem.find( '#' + spy.id ) );
						} else {
							console.log('else');
							console.log(spyElems[spy.id]);
							results.push( void 0 );
						}
					}
					return results;
				} );

				return $( $window ).scroll( function(e) {
					console.log('inside $window.scroll method');
					console.log(e);
					console.log(spyElems)
					var highlightSpy = null;
					var ref = scrollSpy.spies;
					var len = ref.length;
					var i;
					for ( i = 0; i < len; i++ ) {
						var spy = ref[i];
						console.log(spy);
						spy.out();
						var pos;
						if ( (pos = spyElems[spy.id].offset().top) - $window.scrollY <= 0 ) {
							console.log('pos: ' + pos);
							spy.pos = pos;
							if ( highlightSpy == null ) {
								highlightSpy = spy;
							}
							if ( highlightSpy.pos < spy.pos ) {
								highlightSpy = spy;
							}
						}
					}
					console.log('highlightSpy');
					console.log(highlightSpy);
					console.log(highlightSpy != null ? highlightSpy['in']() : void 0);
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
			link : function($scope, elem, attrs, spies) {
				console.log('inside link function of spy directive');
			console.log(elem);
			console.log(attrs);
			console.log(spies);
			spies.addSpy( {
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
		};
	}

	 @@templateCache
}());
