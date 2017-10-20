const webpack = require("webpack")
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry: {
        index: './src/index.tsx',
        vendor: ['lodash'],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                loaders: 'style-loader!css-loader'
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            title: 'cybrowse',
            chunks: ['index', 'vendor']
        }),
        new ExtractTextWebpackPlugin("styles.css"),
        new webpack.HotModuleReplacementPlugin(),

    ],
    devServer: {
        contentBase: "./dist/",  //以public为根目录提供文件
        // colors: true,
        hot: true,
        historyApiFallback: true,
        inline: true
    }
};