module.exports = function(context, options) {
  // Workaronud for symlinks to content
  // based on https://github.com/facebook/docusaurus/issues/3272
  return {
    name: "dmgt-symlinks-plugin",
    configureWebpack(config, isServer, utils) {
      console.log("CHECKING CONFIG:", config)
      return {
        resolve: {
          symlinks: false
        },
        watchOptions: {
          followSymlinks: true
        }
      };
    }
  };
};
