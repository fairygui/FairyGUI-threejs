const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
        minimize: true,
        minimizer: [new TerserPlugin({ sourceMap: true })],
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '_',
            name: true,
            cacheGroups: {
                three: {
                    name: 'three',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](three)[\\/]/,
                }
            },
        }
    }
};