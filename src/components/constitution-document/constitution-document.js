( function() {
    'use strict';

    angular.module( 'fairfield-league-constitution' )

    .component( 'constitutionDocument', {
        templateUrl : 'components/constitution-document/constitution-document.html',
        controller : [ ConstitutionDocumentCtrl ]
    } );

    function ConstitutionDocumentCtrl() {
        var vm = this;
    }
} )();
