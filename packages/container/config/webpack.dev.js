// Функция merge для объединения нескольких объектов с конфигами вебпак
const { merge } = require('webpack-merge')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    // объяснение свойтсва будет позже
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // Имя модуля
      name: 'marketing',
      // Название файла манифеста.
      // Лучше всегда оставлять remoteEntry.js
      filename: 'remoteEntry.js',
      // Здесь выбираем один или несколько файлов, которые мы хотим расширать во "внешний мир"
      // Под именем ProductsIndex будем отдавать файл src/bootstrap
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      // шарим зависимости (чтобы при совпадении вмажорной версии в микрофронтах
      // грузилась только одна копия библиотеки)
      // Оптимизация шаринга зависимостей
      // shared: ['react', 'react-dom'],
      shared: packageJson.dependencies,
    }),

    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}

module.exports = merge(commonConfig, devConfig)
