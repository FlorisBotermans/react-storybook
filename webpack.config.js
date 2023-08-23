const path = require('path');
const { ProgressPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (production, sourcemaps) => ({
  output: {
    globalObject: 'globalThis',
    filename: production ? '[name].h-[contenthash].js' : undefined,
    hashDigestLength: 8,
    path: path.resolve(__dirname, 'assets/js'),
    publicPath: '/assets/js/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        include: [
          path.resolve(__dirname, 'app/assets/ts'),
        ],
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /.svg?$/,
        include: [
          path.resolve(__dirname, 'app/assets/icons'),
        ],
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
      },
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      threads: 2
    }),
    new ProgressPlugin({
      activeModules: false
    }),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      filter: (file => !file.name.endsWith('.map')),
      generate: (seed, files) => {
        return {
          files: files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed),
          entrypoints: files.filter(x => x.isInitial).map(x => x.path)
        };
      },
    })
  ],
  devtool: sourcemaps ? 'source-map' : undefined,
  mode: production ? 'production' : 'development',
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    },
    minimize: production,
    minimizer: [
      new TerserPlugin({
        parallel: true, 
        terserOptions: {
          warnings: false,
          output: {
            comments: false
          }
        }
      })
    ]
  },
  stats: 'errors-warnings',
  performance:  {
    maxAssetSize: 3000000,
    maxEntrypointSize: 3000000,
  },
  resolve: {
    // aliasFields: ['module'], // Workaround for the react-select library in the Select field: https://github.com/emotion-js/emotion/issues/1246#issuecomment-601363607
    // modules: ['node_modules'],
    // extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      // Force transpilated versions of the following packages for IE11
      'react-spring$': 'react-spring/web.cjs',
      'react-spring/renderprops$': 'react-spring/renderprops.cjs',
      'react-use-measure$': 'react-use-measure/dist/web.cjs',
      // 'swiper$': 'swiper/swiper.esm.js',
    }
  },
  bail: production,
  cache: {
    type: 'filesystem', // Use filesystem, because the memory is cleared after each production build
    compression: false,
    buildDependencies: {
      config: [ __filename ]
    },
    // Timeouts should all be set to 0 because webpack-stream does never trigger the store cache event when it is delayed
    idleTimeout: 0,
    idleTimeoutAfterLargeChanges: 0,
    idleTimeoutForInitialStore: 0
  }
});
