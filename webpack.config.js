// 由于加载请求页面的入口文件

// path是node.js里的一个处理路径的基本包
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const miniCssTextExtractPlugin = require('mini-css-extract-plugin') //样式处理模块

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist'),
    },
    module: {
        // 加载器配置
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                exclude:/node_modules/,
                loader: 'babel-loader'
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            // {
            //     test: /\.less$/,
            //     use: [{
            //         loader: "style-loader" // creates style nodes from JS strings
            //     }, {
            //         loader: "css-loader" // translates CSS into CommonJS
            //     }, {
            //         loader: "less-loader" // compiles Less to CSS
            //     }]
            // },
            // {
            //     test: /\.styl/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'stylus-loader',
            //         {
            //             loader:'postcss-loader',
            //             options:{
            //                 sourceMap:true,
            //             }
            //         }
            //     ]
            //
            // },
            {
                test: /\.(gif|jpg|png|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HTMLPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        })
    ]
}

if (isDev) {
    config.module.rules.push({
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            'less-loader'
        ]
    })
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        open: true,
        hot: true,
        // historyApiFallback:{}
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.module.rules.push({
        test: /\.less$/,
        use: [
            miniCssTextExtractPlugin.loader,
            'css-loader'
        ]
    })
    config.plugins.push(
        new miniCssTextExtractPlugin({
            filename: "[name].css",
            chunkFilename: "styles.[contentHash:8].css"   //把css文件单独打包
        })
    )
    new webpack.optimize.RuntimeChunkPlugin({      // 打包和webpack打包相关的代码
        name: 'runtime'
    })
}

module.exports = config