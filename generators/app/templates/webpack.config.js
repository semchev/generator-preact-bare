const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
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
        new HtmlWebpackHarddiskPlugin()
    ],
    devServer: {
        contentBase: './src',
        publicPath: '/',
        watchContentBase: true
    }
};
