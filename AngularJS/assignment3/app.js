(function(){

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
   .service('MenuSearchService', MenuSearchService)
   .constant('resourcePath', 'https://davids-restaurant.herokuapp.com/menu_items.json')
   .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective(){

  var ddo = {
    strict: 'E',
    scope:{
      found: '<',
      onRemove: '&',
      empty : '=',
      message : '='
    },
    templateUrl: 'show-found.html'

  } ;
  return ddo;
  }


  MenuSearchService.inject = ['$http', 'resourcePath'];
  function MenuSearchService($http, resourcePath){

    var service = this;

    //confirms if a search term exists in a string
    function existsSearchTermInString(searchTerm, string){
      if (string.indexOf(searchTerm) != -1){
        return true;
      }
      return false;
    }
    service.getMatchedMenuItems = function(searchTerm){


    return $http({
           method: "GET",
           url:resourcePath
         }).then(function(response){
            var foundItems = [];
            var items = response.data.menu_items;
            if (searchTerm){
              items.forEach(function(element){
                if (existsSearchTermInString(searchTerm, element.description)){
                  foundItems.push(element);
                }
              });
            }

            return foundItems;
        });
  }
}
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){

    var list = this;
    list.found = [];
    //checks if found items list is empty
    list.empty = list.found.length == 0 ? true : false;
    console.log("list empty ", list.empty);
    list.message = ''; //if nothing if foundItems

    list.launchSearch = function (){
      console.log("searchTerm is " + list.searchTerm);

        MenuSearchService.getMatchedMenuItems(list.searchTerm)
        .then(function(items){
          list.found = []; //reseting
          list.message = ''; //reseting
          console.log(items);
          if (items != null && items.length > 0){
            list.found = items;
          }else{
            list.message = 'Nothing found!';
          }
        }).catch(function(error){
          console.log(error);
        }).finally(function(){
          console.log('items in controller: ' + list.found.length);
          list.empty = list.found.length == 0 ? true : false;
          console.log("list empty ", list.empty);
        });


    };

    list.removeItem = function(indexItem){

      list.found.splice(indexItem, 1);
      list.empty = list.found.length == 0 ? true : false;
      console.log("list empty ", list.empty);
    };
  }


})();
