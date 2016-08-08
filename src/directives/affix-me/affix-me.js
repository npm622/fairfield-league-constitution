( function() {
    'use strict';

    angular.module( 'fairfield-league-constitution' )

    .directive( 'affixMe', [ '$timeout', '$window', function( $timeout, $window ) {
        return {
            restrict : 'A',
            link : function( $scope, elem, attrs ) {
                $( '#sidebar' ).affix( {
                    offset : {
                        top : $( 'header' ).height()
                    }
                } );
            }
        }
    } ] );
} )();
