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

require("@fortawesome/fontawesome-free/css/all.min.css");
require("angular-material/angular-material.min.css");

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
// get site title and description
lovelyvegApp.service("siteInfoService", function () {
  // https://szlavidanceart.com/wp-json/
  this.getSiteInfo = function () {
    return wp.root().then(function (info) {
      return {
        title: info.name,
        description: info.description,
      };
    });
  };
});

// get posts for listing
lovelyvegApp.service("postsService", function () {
  // https://szlavidanceart.com/wp-json/
  this.getPosts = function () {
    return wp
      .posts()
      .perPage(10)
      .embed()
      .then(function (posts) {
        return {
          posts: posts,
        };
      });
  };
});

// get single post by slug
lovelyvegApp.service("singlePostService", function () {
  this.getSinglePost = function (slug) {
    return wp
      .posts()
      .slug(slug)
      .embed()
      .then(function (singlePost) {
        return {
          singlePost: singlePost,
        };
      });
  };
});


// CONTROLLERS
require("./controllers.js")(lovelyvegApp, {
  wp: wp,
  he: he,
});

// FILTERS
lovelyvegApp.filter("decodeHtmlEntities", function () {
  return function (str) {
    return he.decode(str + "");
  };
});

