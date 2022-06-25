import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SingIn = ({ onSignIn }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const containerCss = {
    display: 'flex',
    flexDirection: 'column',
    gap: '13px',
    alignItems: 'center',
  }

  const formCss = {
    display: 'flex',
    flexDirection: 'column',
    gap: '13px',
  }

  const buttonCss = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: 'aquamarine',
    border: 'none',
    borderRadius: '13px',
    fontSize: '17px',
    color: 'black',
    cursor: 'pointer',
  }

  // Псевдоавторизация: если введено хоть что-то, тогда onSingIn в стейте контейнера изменит isSignedIn на true - пользователь авторизовался
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Email: ', values.email)
    console.log('Password: ', values.password)

    if (values.email && values.password) {
      onSignIn()

      setValues({
        email: '',
        password: '',
      })
    }
  }

  return (
    <div style={containerCss}>
      <h2>Sing In form</h2>
      <form onSubmit={handleSubmit} style={formCss}>
        <input
          type="text"
          placeholder="Enter your email"
          value={values.email}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              email: event.target.value,
            }))
          }
        />

        <input
          type="text"
          placeholder="Enter your password"
          value={values.password}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              password: event.target.value,
            }))
          }
        />
        <button type="submit" style={buttonCss}>
          Submit
        </button>
      </form>
      <Link to="/auth/signup" style={buttonCss}>
        Sign Up
      </Link>
      <Link to="/" style={buttonCss}>
        Home
      </Link>
    </div>
  )
}

export default SingIn
