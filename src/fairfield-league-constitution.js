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

	 @@templateCache
}());
