module.exports = (lovelyvegApp) => {
  // ROUTES
  lovelyvegApp.config([
    "$routeProvider",
    ($routeProvider) => {
      $routeProvider
        .when("/", {
          templateUrl: "pages/home.html",
          controller: "homeController as home",
        })
        .when("/receptkereso", {
          templateUrl: "pages/recipe-search.html",
          controller: "searchController as search",
        })

        .when("/temakorok/:slug", {
          redirectTo: "/temakorok/:slug/oldal/1"
        })

        .when("/temakorok/:slug/oldal/:number", {
          templateUrl: "pages/tags.html",
          controller: "tagsController as tags",
        })

        // redirect to first page of paginated posts
        .when("/receptek", {
          redirectTo: "/receptek/oldal/1"
        })

        .when("/receptek/oldal/:number", {
          templateUrl: "pages/recipes.html",
          controller: "recipesController as recipes",
        })
        .when("/receptek/:slug", {
          templateUrl: "pages/single-recipe.html",
          controller: "singleRecipeController as singleRecipe",
        })
      
        .otherwise({
          templateUrl: "pages/404.html",
          controller: "notFoundController as notFound",
        });
    },
  ]);
};
