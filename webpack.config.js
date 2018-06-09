const path = require('path');
const webpack = require('webpack');

const pro = process.env.NODE_ENV === 'production';

const chalk = require('chalk');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HappyPack = require('happypack');

console.log('===========================');
pro ? console.log('生产环境') : console.log('开发环境');
console.log('===========================');

const devPort = 3000;

let resolve = dir => {
  return path.join(__dirname,dir);
};

console.log('------编译开始！！------');

let plugs = [
  // new ProgressBarPlugin({
  //   format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
  //   clear: false
  // }),
  new ProgressBarPlugin({
    format : 'build [:bar]' +'(:msg)'+ chalk.green.bold(':percent') + ' (:elapsed seconds)',    //:bar :current :total :elapsed :percent :msg
    // width : 100,
    complete : '***',
    // incomplete : '',
    // renderThrottle : 16,
    clear : false,
    callback : function () {
      console.log('------编译完成！------');
      console.log('http://localhost:'+devPort);
    }
    // stream : 'stderr',
    // summary : true,
    // summaryContent : false,
    // customSummary : function () {
    //
    // }
  }),
  new HappyPack({
    id:'babel',
    loaders: ['babel-loader?cacheDirectory']
  }),
  new HappyPack({
    id:'css',
    loaders: [
      'css-loader',
      'less-loader',
      'sass-loader'
    ]
  }),
  new HappyPack({
    id:'file',
    loaders: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: resolve('src/index.html')
  }),
  // new webpack.DefinePlugin({
  //   'process.env': {
  //     'NODE_ENV': JSON.stringify('production')
  //   }
  // })
  new MiniCssExtractPlugin({
    filename: pro ? '[name].css' : '[name].[hash].css',
    chunkFilename: pro ? '[id].css' : '[id].[hash].css'
  }),
  new webpack.HashedModuleIdsPlugin()
];


if(pro) {

  plugs = [
    ...plugs,
    new UglifyJSPlugin(),
    new CleanWebpackPlugin(resolve('dist'))

  ]


}

module.exports = {
  devtool: pro ? 'cheap-module-source-map' : 'inline-source-map',
  entry: {
    app: pro? [
      'babel-polyfill',
      resolve('src/index.js')
    ] : [
     'react-hot-loader/patch',
      'babel-polyfill',
      resolve('src/index.js')
    ],
    // vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
  },
  output: {
    path: resolve('./dist'),
    filename: pro ? '[name].[chunkhash].js' : '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: pro ? '/' : `http://localhost:${devPort}/`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=babel'],
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.(css|less|scss)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader:'happypack/loader?id=css'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                // require('postcss-import')({ root: loader.resourcePath }),
                // require('postcss-cssnext')(),
                require('autoprefixer')(),
                // require('cssnano')()
              ]
            }
          }
        ],
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.(png|jpg|jpeg|gif|md)$/,
        use: ['happypack/loader?id=file'],
        exclude: /node_modules/,
        include: resolve('src')
      }
    ]
  },
  resolve: {
    extensions: ['.js','.jsx','.less','.scss','.css'],
    modules: [
      resolve('node_modules'),
      resolve('./src')
    ],
    alias: {
      "@": resolve('src'),
      pages: resolve('src/pages'),
      component: resolve('src/component'),
      router: resolve('src/router'),
      actions: resolve('src/redux/actions'),
      reducers: resolve('src/redux/reducers')
    }
  },
  plugins: plugs,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /react|lodash|react-router-dom|redux|react-dom|react-redux/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10
        },
        // page1:{
        //   name: 'page1',
        //   chunks: 'initial',
        //   minSize:0
        // }
      }
    }
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
  //     minSize: 0,                // 最小尺寸，默认0
  //     minChunks: 1,              // 最小 chunk ，默认1
  //     maxAsyncRequests: 1,       // 最大异步请求数， 默认1
  //     maxInitialRequests: 1,    // 最大初始化请求书，默认1
  //     name: () => {},              // 名称，此选项课接收 function
  //     cacheGroups: {                 // 这里开始设置缓存的 chunks
  //       priority: "0",                // 缓存组优先级 false | object |
  //       vendor: {                   // key 为entry中定义的 入口名称
  //         chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
  //         test: /react|lodash|react-router-dom|redux|react-dom|react-redux/,     // 正则规则验证，如果符合就提取 chunk
  //         name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
  //         minSize: 0,
  //         minChunks: 1,
  //         enforce: true,
  //         maxAsyncRequests: 1,       // 最大异步请求数， 默认1
  //         maxInitialRequests: 1,    // 最大初始化请求数，默认1
  //         reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
  //       }
  //     }
  //   }
  // },
  devServer: {
    historyApiFallback: true,
    // noInfo: true,
    // inline: true,
    contentBase: resolve('./dist'),
    port: devPort,
    host: '0.0.0.0',
    // socket: 'socket',
    stats: 'minimal',
    // useLocalIp: true,
    // watchOptions: {
    //   POLL:true
    // }
  }
};
