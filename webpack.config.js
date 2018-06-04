const path = require('path');
const webpack = require('webpack');

const pro = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


console.log('===========================');
console.log(pro);
console.log('===========================');

const devPort = 3000;

let resolve = dir => {
  return path.join(__dirname,dir);
};

let plugs = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: resolve('src/index.html')
  }),
  // new webpack.DefinePlugin({
  //   'process.env': {
  //     'NODE_ENV': JSON.stringify('production')
  //   }
  // })
  new webpack.HashedModuleIdsPlugin()
];


if(pro) {

  plugs = [
    ...plugs,
    new UglifyJSPlugin(),
    new CleanWebpackPlugin(resolve('dist')),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash:5].css',
      allChunks: true
    })
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
        use: ['babel-loader?cacheDirectory=true'],
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.(css|less|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader','less-loader','sass-loader']
        }),
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.(png|jpg|jpeg|gif|md)$/,
        use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]'],
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
        page1:{
          name: 'page1',
          chunks: 'initial',
          minSize:0
        }
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
    host: '0.0.0.0'
  }
};
