/**
 * Created by 张伟 on 2019/03/30.
 */
'use strict'


const path=require('path');


module.exports={
  target:'node', //说明是对server端（纯js）进行打包
  mode: 'production',
  resolve: {
    extensions: ['.js'],
  },
  entry:{app:'./index.js'},
  output:{
    filename: "easyJSON.js", //js文件会被分离成app/vendor，所以需要使用chunkhash
    // path: path.resolve(__dirname,'own_dist') //打包文件输出路径
      path:path.join(__dirname,'dist'),//打包文件输出路径
  },
  plugins: [

  ],
  module: {
    rules: [
      {
        test:/\.js$/,
        exclude:/(node_modules|bower_components)/,//排除掉node_module目录
        use:{
          loader:'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      }

      ]
      }


}
