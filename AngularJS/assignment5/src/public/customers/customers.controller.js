(function(){

angular.module('customers')
.controller('CustomersController', CustomersController);

CustomersController.$inject = ['infoCustomer'];
function CustomersController(infoCustomer){


	var customer = this;
	customer.infoCustomer = infoCustomer;

	
}

})();