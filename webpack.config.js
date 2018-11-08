// 由于加载请求页面的入口文件

// path是node.js里的一个处理路径的基本包
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.join(__dirname,'src/index.js'),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname,'dist'),
    },
    module:{
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|png|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}