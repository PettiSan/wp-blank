const path = require('path')
const webpack = require('webpack')

// include the js minification plugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

// include the css extraction and minification plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: [
    './wp-content/themes/dadobier/assets/js/app.js',
    './wp-content/themes/dadobier/assets/css/app.scss',
  ],
  output: {
    filename: './wp-content/themes/dadobier/build/js/app.js',
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      // perform js babelization on all .js files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // extract css into dedicated file
    new MiniCssExtractPlugin({
      filename: './wp-content/themes/dadobier/build/css/main.min.css',
    }),
    new BrowserSyncPlugin({
      // host: "ipv4 aqui",
      proxy: 'http://localhost/wp-blank', // TODO: Mudar para o nome da pasta do projeto
      files: [
        {
          match: [
            './wp-content/themes/dadobier/*.php',
            './wp-content/themes/dadobier/components/*.php',
          ],
          fn: function (event, file) {
            if (event === 'change') {
              const bs = require('browser-sync').get('bs-webpack-plugin')
              bs.reload()
            }
          },
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './wp-content/themes/dadobier/assets/fonts',
          to: './wp-content/themes/dadobier/build/fonts',
        },
        {
          from: './wp-content/themes/dadobier/assets/img',
          to: './wp-content/themes/dadobier/build/img',
        },
      ],
    }),
  ],
  optimization: {
    minimize: false, // false para desenvolvimento // true para build de prod
    minimizer: [
      // enable the js minification plugin
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
      }),
      // enable the css minification plugin
      new OptimizeCSSAssetsPlugin({}),
      // new CssMinimizerPlugin(),
    ],
  },
}
