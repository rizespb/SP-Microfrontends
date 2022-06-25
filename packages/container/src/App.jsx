import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import Progress from './components/Progress'

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

// Это делается для того, чтобы useStyles генерировал имена классов с префиксом. Чтобы избежать совпадения имен классов с классами в Коентейнере
const generateClassname = createGenerateClassName({
  productionPrefix: 'co',
})

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  console.log('isSignedIn', isSignedIn)
  return (
    <BrowserRouter>
      <StylesProvider generateClassname={generateClassname}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />

          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>

              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  )
}

export default App
