(function () {
"use strict";

angular.module('signup')
.controller('SignUpController', SignUpController)
.controller('CustomersController', CustomersController)
.service('ServiceMenuItem', ServiceMenuItem)
.constant('ApiPath', 'https://jvillanueva-angularjs.herokuapp.com/menu_items');


  ServiceMenuItem.$inject = ['$http', 'ApiPath','$q'];

  function ServiceMenuItem($http, ApiPath, $q){

    var service = this;
    service.infoCustomer = [];

    service.getMenuItem = function(shortName) {
     console.log("param in service is ", shortName);
      return  $http({
        method: 'GET',
        url: (ApiPath + '/' + shortName + '.json')
        
      });
    };

    service.getStoreIformation = function(){

      return service.infoCustomer;
    };


}

  


SignUpController.$inject = ['ServiceMenuItem', '$timeout'];
function SignUpController(ServiceMenuItem, $timeout) {
  var sig = this;

  sig.user = {};
  sig.completed = false;

  sig.submit = function(){

    console.log("Calling service...");
    console.log("param ",sig.user.item);

    var promise = ServiceMenuItem.getMenuItem(sig.user.item);
    promise.then(function(response){
      
        console.log("Menu item retrived:", response.data); 
        var objInfo = response.data;
        //customer info added
        objInfo.customer = {};
        objInfo.customer.firstname = sig.user.firstname;
        objInfo.customer.lastname = sig.user.lastname;
        console.log("customer info: ", objInfo);
        ServiceMenuItem.infoCustomer = []; //reset info
        ServiceMenuItem.infoCustomer.push(objInfo); 
        
        sig.completed = true; //shows ok message
        sig.error = false;
        $timeout(function(){
          sig.completed = false;
        },2000);
    })
    .catch(function(error){
      console.log(error.status + ", " + error.statusText);
        sig.completed = false;
        sig.error = true;
        $timeout(function(){
          sig.error = false;
        },2000);
    });
    

    
  };

  
}

  CustomersController.$inject = ['ServiceMenuItem'];
  function CustomersController(ServiceMenuItem){

    var customers = this;

    customers.$onInit = function(){

      customers.items = ServiceMenuItem.getStoreItems();
    }
  
  }


})();