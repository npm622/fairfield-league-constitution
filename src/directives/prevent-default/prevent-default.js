( function() {
    'use strict';

    angular.module( 'fairfield-league-constitution' )

    .directive( 'preventDefault', function() {
        return function( scope, element, attrs ) {
            jQuery( element ).click( function( event ) {
                event.preventDefault();
            } );
        }
    } );
} )();
