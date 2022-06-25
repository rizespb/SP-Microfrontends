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
    // Часть публичного (на реальном сайте) пути, которая будет добавляться перед именем файла при встраивании скрипта в index.html
    // Приведен пример для настройки AWS и S3
    publicPath: '/container/latest/',
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // marketing/latest - это специфическое положение файлов микрофронтов на сервере. В данном случае речь идет о AWS и S3
        marketingRemote: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        authRemote: `auth@${domain}/auth/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
}

module.exports = merge(commonConfig, prodConfig)
