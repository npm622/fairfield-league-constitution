( function() {
    'use strict';

    angular.module( 'fairfield-league-constitution' )

    .directive( 'spy', function( $location, $anchorScroll ) {
        return {
            resrict : 'A',
            require : '^scrollSpy',
            link : function( $scope, elem, attrs, scrollSpy ) {
                elem.bind( 'click', function( e ) {
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
    } );
} )();
