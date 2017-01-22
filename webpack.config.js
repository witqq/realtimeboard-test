var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var webpack = require("webpack");

module.exports = {
    devtool: "eval",
    context: path.resolve(__dirname, 'app/'),
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'app/'),
        filename: './bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    plugins: [
        new WebpackNotifierPlugin({alwaysNotify: true}),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            // для детектора angular
            "window.jQuery": 'jquery'

        })
    ],
    devServer: {
        contentBase: 'app'
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
                    "awesome-typescript-loader"
                ],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {test: /\.html$/, loader: 'raw'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
        ]
    }
};