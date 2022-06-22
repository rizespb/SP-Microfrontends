// Функция merge для объединения нескольких объектов с конфигами вебпак
const { merge } = require('webpack-merge')

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    // объяснение свойтсва будет позже
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // имя модуля
      name: 'container',
      remotes: {
        marketingRemote: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      // Оптимизация шаринга зависимостей
      // shared: ['react', 'react-dom'],
      shared: packageJson.dependencies,
    }),
  ],
}

module.exports = merge(commonConfig, devConfig)
