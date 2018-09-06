
(function(){
	'use strict';
	angular.module("app3",[])
	.controller("controller",Controller)
	.directive("menuItems",MenuItems);
	
	function MenuItems(){
		var ddo={
			template:"<div class=\"col-sm-12\"><br><ul><li ng-repeat=\"item in c1.items\">{{item.name}},{{item.short_name}},{{item.description}}</li></ul></div>"
		}
		return ddo;
	}

	
	function Controller($http)
	{
		var c1=this;
		c1.searchText="";
		c1.items=[];
		
		c1.getMenu=function(){
			$http({
				method:"GET",
				url:"https://davids-restaurant.herokuapp.com/menu_items.json"
			}).then(function (result) {
				c1.items=[];
				result.data.menu_items.forEach(function(element) {
				if(element.description.includes(c1.searchText))
				{
					c1.items.push(element);
				}
				});
			});
		};
	};

})();