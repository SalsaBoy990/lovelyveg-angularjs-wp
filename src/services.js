module.exports = (lovelyvegApp, wp) => {
  
  
  
  // get site title and description
  lovelyvegApp.service("siteInfoService", function () {
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
    this.getPosts = function (perPage = 10, id = 1) {
      return wp
        .posts()
        .categories(["105", "106", "283", "358"])
        .excludeCategories([
          "290",
          "130",
          "289",
          "215",
          "190",
          "189",
          "107",
          "126",
        ])
        .perPage(perPage)
        .page(id)
        .embed()
        .then((posts) => {
          return {
            posts: posts,
          };
        });
    };
  });



  // get categories for listing
  lovelyvegApp.service("categoriesService", function () {
    this.getCategories = function (args) {
      return wp
        .categories()
        .perPage(13)
        .then((categories) => {
          return {
            categories: categories,
          };
        });
    };
  });



  // search in posts service
  lovelyvegApp.service("searchService", function () {
    // https://szlavidanceart.com/wp-json/
    this.getSearchResults = function (
      searchTerm,
      perPage = 10,
      pageNumber = 1
    ) {
      return wp
        .posts()
        .categories(["105", "106", "283", "358"])
        .excludeCategories([
          "290",
          "130",
          "289",
          "215",
          "190",
          "189",
          "107",
          "126",
        ])
        .search(searchTerm)
        .perPage(perPage)
        .page(pageNumber)
        .orderby("title")
        .order("asc")
        .embed()
        .then(function (posts) {
          return {
            posts: posts,
          };
        })
        .catch(function (err) {
          console.error(err);
          return {
            posts: {},
          };
        });
    };
  });



  // tag-filtered posts, tags service
  lovelyvegApp.service("tagsService", function () {

    // filter posts by tag
    this.getTagsResults = function (tag, perPage = 10, pageNumber = 1) {
      return wp
        .posts()
        .categories(["105", "106", "283", "358"])
        .excludeCategories([
          "290",
          "130",
          "289",
          "215",
          "190",
          "189",
          "107",
          "126",
        ])
        .tags(tag)
        .perPage(perPage)
        .page(pageNumber)
        .orderby("title")
        .order("asc")
        .embed()
        .then(function (posts) {
          return {
            posts: posts,
          };
        })
        .catch(function (err) {
          console.error(err);
          return {
            posts: {},
          };
        });
    };

    // get tag from slug
    this.getTagId = (slug) => {
      return wp.tags().slug(slug);
    }

    // get all tags
    this.getTags = () => {
      return wp
        .tags()
        .perPage(47)
        .then((tags) => {
          return {
            tags: tags,
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
};
