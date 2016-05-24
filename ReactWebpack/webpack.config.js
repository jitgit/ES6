"use strict";
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);

var merge = require('webpack-merge');
var TARGET = process.env.TARGET || 'dev';

var baseWebpackConfig = {
    entry: [path.resolve(ROOT_PATH, './src/main.jsx')],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        filename: './bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx$|\.js$/,
                loader: 'eslint-loader',
                include: path.resolve(ROOT_PATH, './src'),
                exclude: /bundle\.js$/
            }
        ],
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel'
            }
        ]
    }

};
var COMMON_PLUGINS = [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    })
    // Include the required NPM & $ will be available globally
    // You can use import $ from 'jquery' as well.
    //new webpack.ProvidePlugin({
    //    $: "jquery"
    //})
];
var WebpackTarget = {};

switch (TARGET) {
    case 'build':
        WebpackTarget = merge(baseWebpackConfig, {
            plugins: COMMON_PLUGINS.concat([
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                }),
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('production')
                    }
                })
            ])
        });

        break;

    case 'dev':
        WebpackTarget = merge(baseWebpackConfig, {
            plugins: COMMON_PLUGINS.concat([
                new webpack.HotModuleReplacementPlugin()
            ]),
            entry: [
                'webpack/hot/dev-server'
            ]
        });
        break;
}
module.exports = WebpackTarget;