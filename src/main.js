// IMPORTS
// load AngularJS core
import angular from "angular";

// load AngularJS modules
import route from "angular-route";

import resource from "angular-resource";

import animate from "angular-animate";

import aria from "angular-aria";

import material from "angular-material";

import sanitize from "angular-sanitize";

// access WP REST API
import WPAPI from "wpapi";

// convert date to time ago
import timeago from "timeago.js";

import he from "he";

import emojiStrip from "emoji-strip"

require("angular-material/angular-material.min.css");
import "./global.css";

// =========================================================

// instantiate WP API client object
const wp = new WPAPI({
  endpoint: "https://lovelyveg.hu/wp-json/",
});

console.table(wp);

// MODULES
const lovelyvegApp = angular.module("lovelyvegApp", [
  "ngRoute",
  "ngResource",
  "ngMaterial",
  "ngSanitize",
]);

require("./routes.js")(lovelyvegApp);

lovelyvegApp.config([
  "$mdThemingProvider",
  function ($mdThemingProvider) {
    $mdThemingProvider
      .theme("default")
      .primaryPalette("purple")
      .accentPalette("deep-orange");
  },
]);


// SERVICES
require("./services.js")(lovelyvegApp, wp);

// CONTROLLERS
require("./controllers.js")(lovelyvegApp, he, emojiStrip);

// FILTERS
lovelyvegApp.filter("decodeHtmlEntities", function () {
  return function (str) {
    return he.decode(str + "");
  };
});



lovelyvegApp.directive("postList", () => {
  return {
    restrict: "EA",
    templateUrl: "directives/post-list.html",
    replace: true,
    scope: {
      postData: "="
    }
  }
});

lovelyvegApp.directive("postPaginator", () => {
  return {
    restrict: "EA",
    templateUrl: "directives/post-paginator.html",
    replace: true,
    scope: {
      paginatorData: "=",
    }
  }
});

// lovelyvegApp.directive("postsByTag", () => {
//   return {
//     restrict: "EA",
//     templateUrl: "directives/posts-by-tag.html",
//     replace: true,
//     scope: {
//       postsByTag: "=",
      
//       tag: "@"

//       // use method
//       convertToDateTime: "&",
//       convertToFahrenheit: "&",
//       convertToCelsius: "&",
//     }
//   }
// })

