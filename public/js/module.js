'use strict';
var app = angular.module('propertyApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        })
        .state('tenant', {
            url: '/tenant',
            templateUrl: '/html/tenant.html',
            controller: 'tenantCtrl'
        })
        .state('property', {
            url: '/property',
            templateUrl: '/html/property.html',
            controller: 'propertyCtrl'
        })
        .state('tenantDetail',{
            url: '/tenantDetail/:id',
            templateUrl: '/html/tenantDetail.html',
            controller: 'tenantDetailCtrl',
            resolve: {
                id: function(Tenant, $stateParams) {
                    return Tenant.getById($stateParams.id);
                }
            }
        })
        .state('propertyDetail',{
            url: '/propertyDetail/:id',
            templateUrl: '/html/propertyDetail.html',
            controller: 'propertyDetailCtrl',
            resolve: {
                id: function(Property, $stateParams) {
                    return Property.getById($stateParams.id);
                }
            }
        })
    $urlRouterProvider.otherwise('/');
});
