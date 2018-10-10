(function () {
'use strict';

angular.module('MenuApp')
.component('myItems', {
  templateUrl: 'src/menuapp/templates/items-result.template.html',
  bindings: {
    items: '<'
  }
});

})();
