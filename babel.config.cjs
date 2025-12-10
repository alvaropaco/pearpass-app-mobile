module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { node: 'current' },
          modules: 'commonjs'
        }
      ],
      // 'module:@react-native/babel-preset',
      'babel-preset-expo'
    ],
    plugins: ['macros']
  }
}
