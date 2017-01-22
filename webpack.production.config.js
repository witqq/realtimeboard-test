var path = require('path');
var webpack = require("webpack");

module.exports = {
    context: path.resolve(__dirname, 'app/'),
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: './bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            // для детектора angular
            "window.jQuery": 'jquery'

        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'BROWSER': JSON.stringify(true),
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
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