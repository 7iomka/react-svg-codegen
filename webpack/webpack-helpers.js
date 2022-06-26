const path = require('path');
const svgrTemplate = require('./svgrc-template');

const svgConfig = (webpackConfig, { isServer } = { isServer: false }) => {
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
