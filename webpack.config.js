var path = require('path')
var webpack = require('webpack')

module.exports ={
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
      {test:/\.css$/,loader:'style-loader!css-loader'}
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
}