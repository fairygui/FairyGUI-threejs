const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.ts'),
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'FairyGUI-threejs Demo',
            template: path.resolve(__dirname, 'template.html')
        }),
        new CopyWebpackPlugin([
            {
              from:path.resolve(__dirname, 'assets'),
              to:path.resolve(__dirname, 'build/assets')
            }
          ])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },

    optimization: {
        //minimize: true,
        //minimizer: [new UglifyJsPlugin({ sourceMap: true })],
        splitChunks: {
            chunks: 'all',//同时分割同步和异步代码,推荐。
            automaticNameDelimiter: '_',//名称分隔符，默认是~
            name: true,
            cacheGroups: {  //默认的规则不会打包,需要单独定义
                three: { // 将three抽出来
                    name: 'three',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](three)[\\/]/,
                }
            },
        }
    }
};