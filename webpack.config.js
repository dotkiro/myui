const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { NODE_ENV } = process.env

const isProduction = NODE_ENV === 'production'

const divideEnv = (prod, unpord) => isProduction ? prod : unpord

module.exports = {

  mode: divideEnv('production', 'development'),

  entry: {
    app: './src/index.tsx',
  },

  output: {
    // filename: '[name].[hash:8].js',
  },

  target: 'web',

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  // devtool: '',

  devServer: {
    hot: true,
    clientLogLevel: 'warning',
    contentBase: false,
    port: 8888,
    quiet: true,
    host: '0.0.0.0',
    historyApiFallback: true
  },

  module: {
    
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          },
        ]
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin('From Kiro <dotkiro@gmail.com>'),
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './examples/index.html',
      inject: true,
      minify: {
        decodeEntities: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        conservativeCollapse: true,

        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,

        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: divideEnv([
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
        }
      }),
    ]),
    splitChunks: divideEnv({
      // chunks: 'initial', 
      // minSize: 3000,
      // maxSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // name: true,
      cacheGroups: {
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendors',
        //   chunks: 'all',
        //   priority: 2,
        //   minChunks: 2,
        // },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }
      }
    })
  }
}