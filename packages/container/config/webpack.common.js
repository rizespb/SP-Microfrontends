const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [
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
            presets: ['@babel/preset-react', '@babel/preset-env'],

            // @babel/plugin-transform-runtime – добавляет в JS полифилы для новых фишек (Promise, Symbol, Set и т.д.), которых нет в ES5
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
