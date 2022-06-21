import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Функция mount для монтирования и запуска приложения
const mount = (el) => {
  ReactDOM.render(<App />, el)
}

// Если в режиме девелопмент (изолировано), тогда вызываем mount немедленно
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root')

  if (devRoot) mount(devRoot)
}

// Если запущено через контейнер, просто экспортируем mount
export { mount }
