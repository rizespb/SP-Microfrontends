import React from 'react'
import { Switch, Route, Router, Link } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import SingIn from './components/Singin'
import SingUp from './components/Singup'

// Это делается для того, чтобы useStyles генерировал имена классов с префиксом. Чтобы избежать совпадения имен классов с классами в Коентейнере
const generateClassname = createGenerateClassName({
  productionPrefix: 'au',
})

const App = ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassname={generateClassname}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin">
              <SingIn onSignIn={onSignIn} />
            </Route>

            <Route path="/auth/signup">
              <SingUp onSignIn={onSignIn} />
            </Route>

            <Route path="/">
              <h1>It's Auth App</h1>

              <Link to="/auth/signin">
                <h2>Sign In</h2>
              </Link>

              <Link to="/auth/signup">
                <h2>Sign Up</h2>
              </Link>
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}

export default App


// Test comment