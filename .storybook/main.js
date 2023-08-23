module.exports = {
  stories: [
    "../app/assets/ts/**/*.stories.mdx",
    "../app/assets/ts/**/*.stories.@(js|jsx|ts|tsx)",
    "../app/stories/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-coverage",
    "@storybook/preset-scss",
    "storybook-addon-mock"
  ],
  staticDirs: ['../app/assets/img'],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  features: {
    interactionsDebugger: true
  },
  webpackFinal: async (config) => {
    const indexOfRuleToRemove = config.module.rules.findIndex(rule => rule.test.toString().includes('svg'))
    config.module.rules.splice(indexOfRuleToRemove, 1, {
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      loader: require.resolve('file-loader'),
      options: {
        name: 'static/media/[name].[hash:8].[ext]',
        esModule: false
      }
    })

    config.module.rules.push(
      {
        test: /.svg$/,
        use: [
          {
            loader: '@svgr/webpack?+titleProp',
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false
                }
              }
            }
          },
        ],
      }
    )

    return config;
  }
}