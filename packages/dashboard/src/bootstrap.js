import React from 'react'
import ReactDOM from 'react-dom'
// createBrowserHistory добавляем для того, чтобы удобно работать при изолированном запуске микрофронта
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

// Функция mount для монтирования и запуска приложения
const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  // При изолированном запуске будет использоваться defaultHistory (Browser History Object), созданная с помощью createBrowserHistory
  // При запуске из контейнера не будем передавать defaultHistory, будет использоваться Memory History Object
  // Передаем initialPath, чтобы микрофронт понимал, на каком адресе мы сейчас находимся и, соответственно, какие компоненты надо отрисовать
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    })

  // Вешаем обработчик событий
  // При изменении объекта history (переходе по новым роутам), будет вызываться коллбэк
  // Коллбэку будет автоматически передаваться объект Location
  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el)

  // Метод onParentNavigate будет использоваться для сихронизации объекта Memory History дочернего микрофронта с изменениями path в контейнере
  return {
    onParentNavigate(location) {
      const { pathname: nextPathName } = location

      const { pathname } = history.location

      if (pathname !== nextPathName) {
        history.push(nextPathName)
      }
    },
  }
}

// Если в режиме девелопмент (изолировано), тогда вызываем mount немедленно
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root')

  // defaultHistory передаем для того, чтобы удобно работать при изолированном запуске микрофронта в режиме development
  if (devRoot) mount(devRoot, { defaultHistory: createBrowserHistory() })
}

// Если запущено через контейнер, просто экспортируем mount
export { mount }
