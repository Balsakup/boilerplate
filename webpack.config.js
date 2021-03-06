const path                    = require('path');
const CleanWebpackPlugin      = require('clean-webpack-plugin');
const ManifestPlugin          = require('webpack-manifest-plugin');
const UglifyJsPlugin          = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const devMode                 = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        publicPath: '/assets/',
        filename: devMode ? '[name].js' : '[name].[chunkhash].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true
    },
    resolve: {
        extensions: [ '.js', '.ts' ]
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader'
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000
                        }
                    }
                ]
            },
            {
                test: /\.(t|j)s$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {
            exclude: 'index.html'
        }),
        new ManifestPlugin({
            name: path.resolve(__dirname, 'dist')
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin
        ]
    }
};