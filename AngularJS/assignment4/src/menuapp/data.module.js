(function () {
'use strict';

angular.module('data', []);

angular.module('data')
.config(function () {
  console.log("data config fired.");
}).
run(function () {
  console.log("data run fired.");
});

})();
