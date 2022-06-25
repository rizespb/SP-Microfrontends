const { merge } = require('webpack-merge')

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const packageJson = require('../package.json')
const commonConfig = require('./webpack.common')

const prodConfig = {
  // вызовет минимизацию и оптимизацию файлов при сборке
  mode: 'production',

  // Шаблон для формирования имен файлов
  output: {
    filename: '[name].[contenthash].js',
    // Часть публичного (на реальном сайте) пути, которая будет добавляться перед именем файла *.js при необходимости дургих частей программы обратиться к этим файлам
    // Приведен пример для настройки AWS и S3
    publicPath: '/dashboard/latest',
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
}

module.exports = merge(commonConfig, prodConfig)
