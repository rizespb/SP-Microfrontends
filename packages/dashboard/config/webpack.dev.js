// Функция merge для объединения нескольких объектов с конфигами вебпак
const { merge } = require('webpack-merge')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  output: {
    // В dev-конфигах мы добавляем publicPath, чтобы при изолированном запуске пр обращении к страницам по прямым адресам, например, http://localhost:8082/auth/singin указать вебпаку, что файл со скриптами (main.js) находится по адресу http://localhost:8082/main.js
    publicPath: 'http://localhost:8083/',
  },
  devServer: {
    port: 8083,
    // объяснение свойтсва будет позже
    historyApiFallback: {
      index: '/index.html',
    },
    // Этот конфиг использовался только со Vue для настройки CORS Для загрузки некоторых специфических файлов. Возможно, это не связано со Vue, а просто совпало
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // Имя модуля
      name: 'auth',
      // Название файла манифеста.
      // Лучше всегда оставлять remoteEntry.js
      filename: 'remoteEntry.js',
      // Здесь выбираем один или несколько файлов, которые мы хотим расширать во "внешний мир"
      // Под именем ProductsIndex будем отдавать файл src/bootstrap
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      // шарим зависимости (чтобы при совпадении вмажорной версии в микрофронтах грузилась только одна копия библиотеки)
      // shared: ['react', 'react-dom'],
      shared: packageJson.dependencies,
    }),

    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}

module.exports = merge(commonConfig, devConfig)
