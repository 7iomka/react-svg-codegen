const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const svgrTemplate = require('./svgrc-template');

const svgConfig = (webpackConfig, { isServer } = { isServer: false }) => {
  // generate svg map file on build (only in dev,
  // and only once (for next.js, bc. it runs twice for server and client))
  if (process.env.NODE_ENV === 'development' && !isServer) {
    webpackConfig.plugins.push(
      new WebpackShellPluginNext({
        onBuildEnd: {
          scripts: [
            `echo -- Icons watcher task`,
            'yarn icons:generate-and-watch',
          ],
          blocking: false,
          parallel: true,
        },
      }),
    );
  }

  webpackConfig.module.rules.push({
    test: /\.svg$/,
    oneOf: [
      // ?sprite: add icon to sprite
      {
        resourceQuery: /sprite/,
        issuer: /\.(ts|tsx)?$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              runtimeGenerator: require.resolve(
                path.resolve(__dirname, './svg-runtime-generator'),
              ),
            },
          },
        ],
      },
      // default behavior: inline if below the defined limit, external file if above
      {
        issuer: /\.tsx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              memo: true,
              typescript: true,
              template: svgrTemplate,
              // svgoConfig: { plugins: [{ removeViewBox: false }] },
            },
          },
        ],
      },
      // Default behavior for other than tsx files that requires svg
      {
        // use: ['url-loader'], // Disabled, deprecated in Webpack 5
        type: 'asset/inline',
      },
    ].filter(Boolean),
  });
};


module.exports = { svgConfig };
