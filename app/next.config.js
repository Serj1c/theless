const path = require('path');

module.exports = {
  poweredByHeader: false,
  webpack(config) {
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['constants'] = path.join(__dirname, 'constants');
    config.resolve.alias['models'] = path.join(__dirname, 'models');
    config.resolve.alias['utils'] = path.join(__dirname, 'utils');

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
