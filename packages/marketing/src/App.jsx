import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import Landing from './components/Landing'
import Pricing from './components/Pricing'

// Это делается для того, чтобы useStyles генерировал имена классов с префиксом. Чтобы избежать совпадения имен классов с классами в Коентейнере
const generateClassname = createGenerateClassName({
  productionPrefix: 'ma',
})

const App = ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassname={generateClassname}>
        <Router history={history}>
          <Switch>
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}

export default App
