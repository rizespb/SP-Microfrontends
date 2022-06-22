// Функция merge для объединения нескольких объектов с конфигами вебпак
const { merge } = require('webpack-merge')

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

// Текущий домен, на котором расположены все микрофронты
const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
  // вызовет минимизацию и оптимизацию файлов при сборке
  mode: 'production',

  // Шаблон для формирования имен файлов
  output: {
    filename: '[name].[contenthash].js',
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketingRemote: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
}

module.exports = merge(commonConfig, prodConfig)
