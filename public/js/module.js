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
    $urlRouterProvider.otherwise('/');
});
