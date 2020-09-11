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
        .when("/receptek", {
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
