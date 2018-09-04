
(function(){
	'use strict';
	angular.module("app2",[])
	.controller("controller1",Controller1)
	.controller("controller2",Controller2)
	.service("list",ListService);

	
	function Controller1(list)
	{
		var c1=this;
		c1.tobay=list.getToBay();
		
		c1.bought=function(index)
		{
			list.bay(index);
		}
	};
	
	function Controller2(list)
	{
		var c2=this;
		c2.boughtList=list.getBought();
	};
	
	function ListService()
	{
		var service=this;
		
		var tobay=[
		{name: "cookies", quantity: 10 },
		{name: "chips", quantity: 3 },
		{name: "aaa", quantity: 30 },
		{name: "bbb", quantity: 13 },
		{name: "ccc", quantity: 45 }
		];
	
		var bought=[];
		
		service.bay=function (index)
		{
			bought.push(tobay[index]);
			tobay.splice(index, 1);
		};
		
		service.getToBay=function(){
			return tobay;
		};
		
		service.getBought=function(){
			return bought;
		};
		
	};
})();