'use strict';
var app = angular.module('propertyApp');

app.controller('homeCtrl', function($scope) {
    console.log('homeCtrl');
});

app.controller('tenantCtrl', function($scope, Tenant, Property) {

    getAllProperties();
    getAllTenants();
    $scope.saveTenant = (newTenant) => {
        Tenant.create(newTenant);
        newTenant = {};
        getAllTenants();
    }

    function getAllProperties() {
        Property.getAll()
            .then(res => {
                // console.log(res.data);
                $scope.properties = res.data;
                console.log($scope.properties );
            })
            .catch(err => {
                console.log("err:", err);
            });
    }

    function getAllTenants() {
        Tenant.getAll()
            .then(res => {
                // console.log(res.data);
                $scope.tenants = res.data;
            })
            .catch(err => {
                console.log("err:", err);
            });
    }

    var editingId;
    $scope.editOneTenant = tenant => {
        editingId = tenant._id;
        $scope.editTenant = angular.copy(tenant);
    }

    $scope.saveEditedTenant = () => {
        Tenant.edit(editingId, $scope.editTenant);
        getAllTenants();
        $scope.editTenant = {};
    }

    $scope.removeTenant = tenant => {
        Tenant.delete(tenant._id);
        getAllTenants();
    }

    $scope.sortBy = tenant =>{
       if($scope.sortOrder == tenant){
           $scope.sortOrder = '-' + tenant;
       }
       else{
           $scope.sortOrder = tenant;
       }
   }

});
app.controller('propertyCtrl', function($scope, Property) {
    getAllProperties()
    $scope.saveProperty = (newProperty) => {
        console.log($scope.newProperty);
        Property.create(newProperty);
        newProperty = {};
        getAllProperties();
    }

    function getAllProperties() {
        Property.getAll()
            .then(res => {
                // console.log(res.data);
                $scope.properties = res.data;
            })
            .catch(err => {
                console.log("err:", err);
            });
    }

    var editingId;
    $scope.editOneProperty = property => {
        editingId = property._id;
        $scope.editProperty = angular.copy(property);
    }

    $scope.saveEditedProperty = () => {
        Property.edit(editingId, $scope.editProperty);
        getAllProperties();
        $scope.editProperty = {};
    }

    $scope.removeProperty = property => {
        Property.delete(property._id);
        getAllProperties();
    }
    $scope.filterSome = (criteria, value) => {
        console.log(criteria, value);
        var query = {
            criteria: criteria,
            value: value
        }

        Property.filterpartial(query)
            .then(res => {
                $scope.properties = res.data;
            })
            .catch(err => {
                console.log(err);
            })

    }

    $scope.sortBy = property =>{
       if($scope.sortOrder == property){
           $scope.sortOrder = '-' + property;
       }
       else{
           $scope.sortOrder = property;
       }
   }
});
