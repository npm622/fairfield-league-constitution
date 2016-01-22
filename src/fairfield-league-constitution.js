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

	.directive( 'scrollSpy', function($timeout) {
		return {
			restrict : 'A',
			link : function(scope, elem, attr) {
				var offset = parseInt( attr.scrollOffset, 10 );
				if ( !offset )
					offset = 10;
				elem.scrollspy( {
					'offset' : offset
				} );
				scope.$watch( attr.scrollSpy, function(value) {
					$timeout( function() {
						elem.scrollspy( 'refresh', {
							'offset' : offset
						} )
					}, 1 );
				}, true );
			}
		}
	} )

	.directive( 'preventDefault', function() {
		return {
			restrict : 'A',
			link : function(scope, elem, attr) {
				$( elem ).on( 'click', function(event) {
					event.preventDefault();
				} );
			}
		}
	} )

	.directive( 'scrollTo', [ '$window', function($window) {
		return {
			restrict : 'AC',
			compile : function() {
				function scrollInto(elementId) {
					if ( !elementId )
						$window.scrollTo( 0, 0 );
					var element = document.getElementById( elementId );
					if ( element )
						element.scrollIntoView();
				}

				return function(scope, elem, attr) {
					elem.bind( 'click', function(event) {
						scrollInto( attr.scrollTo );
					} );
				};
			}
		}
	} ] )

	.controller( 'FlcCtrl', [ FlcCtrl ] );

	function FlcCtrl() {
		var vm = this;
	}

	 @@templateCache
}());
