const path = require('path');

module.exports = function (api) {
  api.cache(true);

  let expoPreset;
  try {
    expoPreset = require.resolve('babel-preset-expo');
  } catch {
    try {
      expoPreset = require.resolve('babel-preset-expo', {
        paths: [path.dirname(require.resolve('expo/package.json'))],
      });
    } catch {
      expoPreset = path.join(__dirname, 'node_modules', 'expo', 'node_modules', 'babel-preset-expo');
    }
  }

  return {
    presets: [expoPreset],
  };
};

