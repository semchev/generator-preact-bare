const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');<%if (react) {%>
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');<% } %>

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js']<% if(!react) { %>,
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }<% } %>
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/env']
                    }
                }
            },
            {
                test: /(\.scss)|(\.css)/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '<%= name %>',
            filename: path.resolve(__dirname, 'dist/index.html'),
            template: path.resolve(__dirname, 'src/index.html'),
            minify: true,
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin()<% if(react) { %>,
        new HtmlWebpackRootPlugin()<% } %>
    ],
    devServer: {
        contentBase: './src',
        publicPath: '/',
        watchContentBase: true
    }
};
