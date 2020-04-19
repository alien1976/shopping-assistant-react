const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const DEV = argv.mode === 'development';
    const BUILD_PATH = DEV ? path.join(__dirname, 'dist') : path.join(__dirname, 'build');

    return ({
        entry: './src/index',
        node: {
            process: false
        },
        watch: DEV,
        stats: {
            warnings: false
        },
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        devtool: DEV ? 'inline-source-map' : false,
        output: {
            path: BUILD_PATH,
            filename: 'js/app.js'
        },
        mode: process.env.NODE_ENV,
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                            }
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true,
                            presets: ['@babel/preset-env'],
                            plugins: ["@babel/plugin-syntax-dynamic-import"]
                        },
                    }

                }
            ]
        },
        optimization: {
            minimize: DEV ? false : true,
            splitChunks: {
                chunks: 'all',
                minChunks: 2
            },
        },
        devServer: DEV ? {
            stats: {
                children: true,
                maxModules: 0
            },
            compress: true,
            port: 3000,
            hot: true,
            lazy: false,
            inline: true,
            watchOptions: {
                poll: 2000,
                aggregateTimeout: 600,
            }
        } : {},
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                favicon: "./src/assets/favicon/favicon.ico",
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
                chunkFilename: 'css/[id].css',
            }),
        ]
    })
};