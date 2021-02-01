module.exports = {
    'stories': [
        '../components/**/*.stories.mdx',
        '../components/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    'addons': [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-addon-themes',
        '@storybook/addon-docs',
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
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[name]__[local]',
                    },
                },
            ],
        };

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
