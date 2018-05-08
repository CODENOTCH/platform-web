const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractSCSS = new ExtractTextPlugin("assets/css/[name].css");

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: './index.js',
  output: {
    path:  path.resolve(__dirname, './public'),
    filename: 'assets/js/build.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractSCSS.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.styl$/,
        use: ExtractSCSS.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
        //loader: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env']
          //presets: ['es2015']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader?name=/assets/img/[name].[ext]'
      },
      {
        test: /\.(eot|ttf|woff)$/,
        loader: 'file-loader?name=/assets/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    /*new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: '"development"'
      }
    }),*/
    ExtractSCSS,
    new HtmlWebpackPlugin({
        title: 'Codenotch',
        filename: './index.html',
        hash: true,
        template: './template-app.ejs'
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true, 
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
