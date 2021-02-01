const path = require('path')

module.exports = {
    'stories': [
        '../components/**/*.stories.mdx',
        '../components/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    'addons': [
        '@storybook/addon-links',
        '@storybook/addon-docs',
        '@storybook/addon-essentials',
        'storybook-addon-themes',
    ],
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
    },
    webpackFinal: async (config, { configType }) => {
        const cssLoaderIndex = config.module.rules.findIndex(rule => String(rule.test).includes('css'));
        const svgLoaderIndex = config.module.rules.findIndex(rule => String(rule.test).includes('svg'));

        config.module.rules[cssLoaderIndex] = {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[name]__[local]',
                        },
                        importLoaders: 1,
                    },
                },
            ],
        };

        config.resolve.alias = {
            ...config.resolve.alias,
            "constants": path.resolve(__dirname, '../constants/'),
            "assets": path.resolve(__dirname, '../assets/'),
            "theme": path.resolve(__dirname, '../theme/'),
        }

        config.module.rules[svgLoaderIndex].test = /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/

        config.module.rules.push({
            test: /\.svg$/,
            loader: 'react-svg-loader',
            options: {
                svgo: {
                    plugins: [{ removeTitle: true }],
                    floatPrecision: 2,
                },
            },
        })

        return config
    },
}
