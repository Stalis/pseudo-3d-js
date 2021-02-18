const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    // devtool: 'inline-source-map',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: './dist',
        port: 9080,
        hot: true,
    },
    cache: {
        type: 'memory',
    },
});