const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { default: webpack } = require('webpack');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]',
                },
            },
            {
                test: /\.tsx?$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
            },
        ],
    },
    resolve: {
        symlinks: false,
        extensions: [ '.tsx', '.ts', '.js', '.png', '.svg', '.jpg', '.jpeg', '.gif'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            cache: false,
            template: './index.html',
            title: 'Canvas Test',
            meta: [
                {
                    charset: 'utf-8',
                },
            ]
        }),
    ],
};