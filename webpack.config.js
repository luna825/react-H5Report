var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var plugins = [
  new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js',
  }),
  new ExtractTextPlugin("styles.css")
];

if(process.env.NODE_ENV === 'production'){
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      test: /(\.jsx|\.js)$/,
      compress: {
        warnings: false
      },
      output: {
        comments: false,  // remove all comments
      },
    })
  );
}else{
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

 var config={
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/',
    path.resolve(__dirname, 'src/index.js')
  ],
  output:{
    path:path.resolve(__dirname,'public','assets'),
    filename:'bundle.js',
    publicPath:'/assets/'
  },
  module:{
    loaders:[
      {
        test: /\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        query:{
          presets:['es2015','react','stage-0']
        }
      },
      {test:/\.css$/,loader: ExtractTextPlugin.extract("style-loader","css-loader") },
      {test: /\.(jpe?g|png|gif|svg)$/, loader: 'url?limit=1024&name=img/[name].[ext]'}
    ]
  },
  plugins:plugins
}


module.exports = config