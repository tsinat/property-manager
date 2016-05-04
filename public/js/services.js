'use strict';
var app = angular.module('propertyApp');
//service for tenants api
app.service('Tenant', function($http, $q) {
    this.getAll = () => {
        return $http.get('/api/tenants');
    };
    this.getById = id => {
        return $http.get(`/api/tenants/${id}`);
    };
    this.create = tenant => {
        console.log(tenant);
        return $http.post('/api/tenants', tenant);
    };
    this.delete = id => {
        return $http.delete(`/api/tenants/${id}`);
    };
    this.edit = (id, tenant) => {
        return $http.put(`/api/tenants/${id}`, tenant);
    };
    this.getCategory = category => {
        return $http.get(`/api/tenants/categories/${category}`);
    }
});

//service for properties api
app.service('Property', function($http, $q) {
    this.getAll = () => {
        return $http.get('/api/properties');
    };
    this.getById = id => {
        return $http.get(`/api/properties/${id}`);
    };
    this.create = property => {
        console.log(property);
        return $http.post('/api/properties', property);
    };
    this.delete = id => {
        return $http.delete(`/api/properties/${id}`);
    };
    this.edit = (id, property) => {
        return $http.put(`/api/properties/${id}`, property);
    };
    this.getCategory = category => {
            return $http.get(`/api/properties/categories/${category}`);
        }
        // this.filterpartial = (criteria, value) => {
    this.filterpartial = query => {
        return $http.post('/api/properties/getsome', query);
        // return $http.get('/api/properties/getsome/', {criteria:criteria, value:value});
    }
});
