module.exports = (lovelyvegApp, he, emojiStrip) => {
  // main menu and header ctrl
  lovelyvegApp.controller("mainController", [
    "$scope",
    "$location",
    ($scope, $location) => {
      // highlight active tab based on current path
      if ($location.path() === "/") {
        $scope.currentNavItem = "home";
      } else if ($location.path() === "/receptek/oldal/1") {
        $scope.currentNavItem = "receptek";
      } else if ($location.path() === "/receptek/oldal/**") {
        $scope.currentNavItem = "receptek";
      } else if ($location.path() === "/receptkereso") {
        $scope.currentNavItem = "receptkereso";
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

      siteInfoService.getSiteInfo().then((res) => {
        console.log(res);
        // we are outside angularjs context
        // apply the changes in the next digest loop
        $scope.$applyAsync(function () {
          self.title = res.title;
          self.description = he.decode(res.description);
        });
      });
    },
  ]);

  // Recipes ctrl
  lovelyvegApp.controller("recipesController", [
    "$scope",
    "$routeParams",
    "$location",
    "postsService",
    "categoriesService",
    function (
      $scope,
      $routeParams,
      $location,
      postsService,
      tagsService
    ) {
      // filter posts by page number for pagination
      this.pageNumber = $routeParams.number;

      this.name = "Vegán Receptek - " + this.pageNumber + ". oldal";

      // number of posts per paginated page
      this.perPage = 10;

      // number of total pages paginated
      this.totalPages = null;

      this.posts = "";
      this.categories = "";
      this.count = null;
      this.postContent = '';

      postsService.getPosts(this.perPage, this.pageNumber).then((res) => {
        console.log(res);

        $scope.$applyAsync(() => {
          this.posts = res.posts;
          this.count = res.posts._paging.total;
          console.log(this.posts);
          this.totalPages = parseInt(res.posts._paging.totalPages, 10);
        });
      });

      this.jumpToNextPage = () => {
        let currentPage = parseInt($routeParams.number, 10);
        if (currentPage < this.totalPages) {
          $location.path("/receptek/oldal/" + (currentPage + 1));
        }
      };

      this.jumpToPrevPage = () => {
        let currentPage = parseInt($routeParams.number, 10);
        if (currentPage > 1) {
          $location.path("/receptek/oldal/" + (currentPage - 1));
        }
      };

    },
  ]);


  // Tags ctrl
  lovelyvegApp.controller("tagsController", [
    "$scope",
    "$routeParams",
    "$location",
    "tagsService",
    function (
      $scope,
      $routeParams,
      $location,
      tagsService
    ) {
      // filter posts by page number for pagination
      this.currentSlug = $routeParams.slug;
      this.pageNumber = parseInt($routeParams.number, 10);

      this.name = '';
      this.count = null;
      this.id = null;
      this.totalPages = null;

      // number of posts per paginated page
      this.perPage = 10;

      // number of total pages paginated
      this.totalPages = null;

      this.posts = "";

      tagsService.getTagId(this.currentSlug).then( (res) => {
        console.log(res);

        $scope.$applyAsync( () => {
          this.name = res['0'].name;
          this.count = res['0'].count;
          this.id = res['0'].id;
        })

        tagsService.getTagsResults(res['0'].id, this.perPage, this.pageNumber).then((res) => {
          console.log(res);
  
          $scope.$applyAsync(() => {
            this.posts = res.posts;
            // console.log(this.posts);
            this.totalPages = parseInt(res.posts._paging.totalPages, 10);
          });
        });

      });

      this.jumpToNextPage = () => {
        let currentPage = parseInt($routeParams.number, 10);
        if (currentPage < this.totalPages) {
          $location.path("/temakorok/" + this.currentSlug + "/oldal/" + (currentPage + 1));
        }
      };

      this.jumpToPrevPage = () => {
        let currentPage = parseInt($routeParams.number, 10);
        if (currentPage > 1) {
          $location.path("/temakorok/" + this.currentSlug + "/oldal/" + (currentPage - 1));
        }
      };
    },
  ]);

  // Recipes ctrl
  lovelyvegApp.controller("searchController", [
    "$scope",
    "searchService",
    "tagsService",
    function ($scope, searchService, tagsService) {
      let self = this;
      this.name = "Receptkereső";
      this.searchTerm = "";
      this.searchResult = "";
      this.gotResults = 0;
      this.msg = "";

      // get results on every keypress
      this.recipeSearch = () => {
        console.log(this.searchTerm);
        if (this.searchTerm !== "" && this.searchTerm.length >= 3) {
          searchService.getSearchResults(this.searchTerm).then((res) => {
            console.log(res);

            // hide spinner when we get the data from server
            this.gotResults = 1;
            $scope.$applyAsync(() => {
              this.searchResult = res.posts;
              this.gotResults = 0;
            });
          });
        }
      };

      this.tags = "";

      tagsService.getTags().then((res) => {
        console.log(res);

        $scope.$applyAsync(() => {
          this.tags = res.tags;
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
      this.post = "";

      console.log($routeParams.slug);

      // get current recipe
      singlePostService.getSinglePost($routeParams.slug).then((res) => {
        console.log(res);

        $scope.$applyAsync(() => {
          this.post = res.singlePost["0"];
          console.log(this.post);
        });
      });
    },
  ]);

  // Page Not Found ctrl
  lovelyvegApp.controller("notFoundController", [
    "$scope",
    "$location",
    function ($scope, $location) {
      this.error =
        "A keresett oldal ('" + $location.path() + "') nem található. :(";
    },
  ]);
};
