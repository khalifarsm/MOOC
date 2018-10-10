(function () {
'use strict';

angular.module('MenuApp')
.component('myCategories', {
  templateUrl: 'src/menuapp/templates/categories-result.template.html',
  bindings: {
    categories: '<'
  }
});

})();
