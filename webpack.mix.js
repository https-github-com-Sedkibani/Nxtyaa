const mix = require("laravel-mix");

mix
  .js("resources/js/app.tsx", "public/js")
  .react()
  .sass("resources/sass/app.scss", "public/css")
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [
        "*",
        ".js",
        ".jsx",
        ".vue",
        ".png",
        "jpg",
        "jpeg",
        ".ts",
        ".tsx",
      ],
    },
  })
  .version();
