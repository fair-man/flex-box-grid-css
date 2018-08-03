const path = require("path");
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// the path(s) that should be cleaned
let pathsToClean = [
  'dist'
];

// the clean options to use
let cleanOptions = {
  root:     __dirname,
  verbose:  true,
  dry:      false,
  watch:    true,
  exclude: [
    './node_modules',
    './src',
    './.git',
    './.gitignore',
    './package.json',
    './package-lock.json',
    './postcss.config.js',
    './webpack.config.js'
  ]
};

let config = {
  entry: './src/main.scss',
  output: {
    path: path.resolve(__dirname),
    filename: 'flex-grid-css.css'
  },
  module: {
    rules: []
  },
  plugins: []
};

module.exports = (env, args) => {
  const MODE = args.mode || 'development';

  if (MODE === 'development') {
    config.watch = true;
  }

  // js
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  });

  // styles
  config.module.rules.push({
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader', 'sass-loader']
    })
  });

  config.plugins.push(
    new ExtractTextPlugin({
      filename: 'flex-grid-css.css'
    })
  );

  // html
  config.plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html'
  }));

  // clean
  config.plugins.push(new CleanWebpackPlugin(pathsToClean, cleanOptions));

  return config;
};