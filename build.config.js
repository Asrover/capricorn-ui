const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const mode = 'production'

const config = {
    mode,
    entry: {
        'capricorn-ui': './components/index.ts',
    },
    devtool: 'source-map',
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, 'dist'),
        library: 'capricorn',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[hash].css',
            chunkFilename: '[id].css',
        }),
        new OptimizeCssAssetsPlugin(),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            constants: path.resolve(__dirname, 'constants/'),
            assets: path.resolve(__dirname, 'assets/'),
            theme: path.resolve(__dirname, 'theme/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: 'cprn_ui_[name]__[local]',
                            },
                            importLoaders: 1,
                        },
                    },
                ],
            },
            {
                test: /\.(j|t)sx?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                ['@babel/preset-env', { targets: { browsers: 'last 2 versions' } }],
                                '@babel/preset-typescript',
                                '@babel/preset-react',
                            ],
                            plugins: ['@babel/transform-runtime', '@babel/plugin-proposal-optional-chaining'],
                        },
                    },
                ],
            },
            {
                test: /\.image.svg$/,
                loader: 'svg-url-loader',
                options: {
                    limit: 10000,
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /^(?!.*\.image\.svg$).*\.svg$/,
                loader: 'react-svg-loader',
                options: {
                    svgo: {
                        plugins: [{ removeTitle: true }],
                        floatPrecision: 2,
                    },
                },
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            fallback: 'file-loader',
                        },
                    },
                ],
            },
        ],
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
            umd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom',
        },
    },
}

module.exports = config
