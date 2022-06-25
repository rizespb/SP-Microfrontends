const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  module: {
    // entry, output и resolve добавляем, потому что в микрофронте dashboard используется Vue - тут немного специфично
    entry: './src/index.js',
    output: {
      filename: '[name].[contenthash].js',
    },
    resolve: {
      extensions: ['js', '.vue'],
    },
    rules: [
      // первые три объекта с конфигами с test и use добавляем, потому что в микрофронте dashboard используется Vue - тут немного специфично
      // Чтобы Вебпак мог правильно обрабатывать импорт изображений и шрифтов
      {
        test: /\.(png|jpe?g|gif|wolf|svg|eot|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.scss|\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
      },
      {
        // данное правило обрабатывает все файлы с расширением
        // *.mjs или *.js

        // test: /\.m?jsx?$/, - так было в курсе. Я добавл test: /\.(mjs|js|jsx)$/ и resolve от себя, чтобы можно было использовать *.jsx
        ////////////////////////////////
        test: /\.(mjs|js|jsx)$/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        ////////////////////////////////

        //исключаем папку node_modules
        exclude: /node_modules/,

        // для этих файлов использовать лоадер
        use: {
          loader: 'babel-loader',

          options: {
            // @babel/preset-react - копмилирует JSX в JS (вызовы React.createElement)
            //@babel/preset-env - преобразует синтаксис 2015+ в ES5
            presets: ['@babel/preset-env'],

            // @babel/plugin-transform-runtime – добавляет в JS полифилы для новых фишек (Promise, Symbol, Set и т.д.), которых нет в ES5
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },

  plugins: [new VueLoaderPlugin()],
}
