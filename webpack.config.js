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
            {test: /\.otf(\?[a-z0-9]+)?$/, loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]'},
            {test: /\.woff(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2"},
            {test: /\.ttf(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?.+)?$/, loader: "file-loader"},
            {test: /\.(svg|jpe?g|png|gif)(\?.+)?$/, loader: "file-loader"},
            {test: /\.cur(\?.+)?$/, loader: "file-loader"}
        ]
    }
};