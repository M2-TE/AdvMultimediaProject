const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        // modules: [path.resolve(__dirname, "node_modules"), "node_modules"]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.min.js',
        library: 'SimpleWebRTC',
        libraryExport: 'default',
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'head'
        }),
        new CopyPlugin([{ from: 'public', ignore: ['index.html'] }])
    ]
};
