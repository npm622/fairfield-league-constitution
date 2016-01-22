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

	.controller( 'FlcCtrl', [ FlcCtrl ] );

	function FlcCtrl() {
		var vm = this;
	}

	// $('#sidebar').affix({
	// offset: {
	// top: 245
	// }
	// });

	// var $body = $(document.body);
	// var navHeight = $('.navbar').outerHeight(true) + 10;

	// $body.scrollspy({
	// target: '#leftCol',
	// offset: navHeight
	// });

	 @@templateCache
}());
