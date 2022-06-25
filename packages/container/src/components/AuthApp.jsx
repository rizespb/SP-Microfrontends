import React, { useRef, useEffect } from 'react'
import { mount } from 'authRemote/AuthApp'
import { useHistory } from 'react-router-dom'

const AuthApp = ({ onSignIn }) => {
  const ref = useRef(null)
  const history = useHistory()

  useEffect(() => {
    // в mount передаем dom-элемент, в который надо смонтировать микрофронтенд
    // и коллбэк onNavigate, которому в микрофронте будет передаваться объект Location
    // Функция mount возвращает коллбэк onParentNavigate, который синхронизирует изменения path в контейнере с объеком Memory History микрофронта
    const { onParentNavigate } = mount(ref.current, {
      // Передаем initialPath, чтобы микрофронт понимал, на каком адресе мы сейчас находимся и, соответственно, какие компоненты надо отрисовать
      initialPath: history.location.pathname,

      onNavigate: (location) => {
        // Новый путь, на который надо перейти
        const { pathname: nextPathName } = location

        // Текущий путь в адресной строке (управляется контейнером)
        const { pathname } = history.location

        if (pathname !== nextPathName) {
          history.push(nextPathName)
        }
      },
      onSignIn,
    })

    // При изменении объекта history в контейнере, будет вызываться onParentNavigate, который будет добавлять эти изменения в объект history микрофронта
    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref}></div>
}

export default AuthApp
