const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var phaserModule = path.join(__dirname, '../', '/node_modules/phaser-ce/');

var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        port: 7000,
        open: true
    },
    entry: {
        main: './src/main.ts',
        vendor: ['pixi', 'p2', 'phaser']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle.[hash].js'
    },

    plugins: [
        new CleanWebpackPlugin(['build']),
        new CopyWebpackPlugin([{ from: path.join(__dirname, 'assets'), to: path.join(__dirname, 'build/assets'), }]),
        new webpack.optimize.CommonsChunkPlugin(
            { name: 'vendor'/* chunkName= */, filename: 'js/vendor.bundle.[hash].js'/* filename= */ }
        ),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        // new webpack.optimize.UglifyJsPlugin() /* 压缩插件用于减少脚本体积  */
    ],
    devtool: '#inline-source-map',
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    }

}