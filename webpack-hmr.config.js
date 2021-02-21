const webpack = require('webpack');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { WebpackPnpExternals } = require('webpack-pnp-externals');

module.exports = function(options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    watch: true,
    externals: [
      WebpackPnpExternals({ exclude: ['webpack/hot/poll?100'] }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/, 'test', 'dist', 'node_modules']
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename }),
    ],
  };
};