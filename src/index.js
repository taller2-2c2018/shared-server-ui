import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App/App'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import history from './redux/history'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store} >
    <Router history={history}>
      <App />
    </Router>
  </Provider>, 
  document.getElementById('root'))
registerServiceWorker()
