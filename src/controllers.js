module.exports = (lovelyvegApp, args) => {


  // main menu and header ctrl
  lovelyvegApp.controller("mainController", [
    "$scope",
    "$location",
    ($scope, $location) => {
  
      // highlight active tab based on current path
      if ($location.path() === "/") {
        $scope.currentNavItem = "home";
      } else if ($location.path() === "/receptek") {
        $scope.currentNavItem = "receptek";
      } else {
        $scope.currentNavItem = "";
      }
  
      // toggle active link in main navbar in header
      $scope.toggleActive = (path) => {
        if (path === $location.path()) {
          $scope.currentNavItem = path;
        }
      };
    },
  ]);




  // Homepage ctrl
  lovelyvegApp.controller("homeController", [
    "$scope",
    "siteInfoService",
    function ($scope, siteInfoService) {
      let self = this;
      this.title = "";
      this.description = "";
  
      console.log(args.wp);
  
      siteInfoService.getSiteInfo().then((res) => {
        console.log(res);
        // we are outside angularjs context
        // apply the changes in the next digest loop
        $scope.$applyAsync(function () {
          self.title = res.title;
          self.description = args.he.decode(res.description);
        });
      });
    },
  ]);
  



  // Recipes ctrl
  lovelyvegApp.controller("recipesController", [
    "$scope",
    "postsService",
    function ($scope, postsService) {
      this.name = "Vegán Receptek";
      this.posts = '';
      let self = this;
  
      postsService.getPosts().then((res) => {
        console.log(res);
  
        $scope.$applyAsync(() => {
          self.posts = res.posts;
        });
      });
    },
  ]);
  



    // Single recipe ctrl
  lovelyvegApp.controller("singleRecipeController", [
    "$scope",
    "$routeParams",
    "singlePostService",
    function ($scope, $routeParams, singlePostService) {
      let self = this;
      this.post = '';
      
      console.log($routeParams.slug);

      // get current recipe
      singlePostService.getSinglePost($routeParams.slug).then( (res) => {
        console.log(res);

        $scope.$applyAsync(()=> {
          self.post = res.singlePost['0'];
          console.log(self.post);
        });
      });
    },
  ]);




    // Page Not Found ctrl
  lovelyvegApp.controller("notFoundController", [
    "$scope",
    "$location",
    function ($scope, $location) {
      this.error = "A keresett oldal ('" + $location.path() + "') nem található. :(";
    },
  ]);
}