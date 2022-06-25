import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SingUp = ({ onSignIn }) => {
  const [values, setValues] = useState({
    name: '',
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

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Email: ', values.email)
    console.log('Password: ', values.password)

    if (values.email && values.password) {
      onSignIn && onSignIn()

      setValues({
        name: '',
        email: '',
        password: '',
      })
    }
  }

  return (
    <div style={containerCss}>
      <h2>Sing Up form</h2>
      <form onSubmit={handleSubmit} style={formCss}>
        <input
          type="text"
          placeholder="Enter your name"
          value={values.name}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              name: event.target.value,
            }))
          }
        />

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
      <Link to="/auth/signin" style={buttonCss}>
        Sign In
      </Link>
      <Link to="/" style={buttonCss}>
        Home
      </Link>
    </div>
  )
}

export default SingUp
