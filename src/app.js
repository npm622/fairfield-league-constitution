( function() {
    'use strict';

    function FlcCtrl() {
        var vm = this;
    }

    angular.module( 'fairfield-league-constitution', [ 'fairfield-league-constitution.templates', 'mgcrea.ngStrap.scrollspy' ] )

    .provider( 'fairfieldLeagueConstitution', function() {
        var vm = this;

        vm.state = 'fairfieldLeagueConstitution';
        vm.setState = function( state ) {
            vm.state = state;
        }

        vm.url = '#/fairfield-league-consitution';
        vm.setUrl = function( url ) {
            vm.url = url;
        }

        vm.display = 'fairfield league constitution';
        vm.setDisplay = function( display ) {
            vm.display = display;
        }

        vm.page = {
            state : vm.state,
            url : vm.url,
            template : '<constitution-document></constitution-document>',
            display : vm.display
        }

        vm.$get = function() {
            return vm;
        };
    } );
}() );
