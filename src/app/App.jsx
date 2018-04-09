import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { persistStore } from 'redux-persist'

import { Home } from '../layout/Home'
import Login from '../modules/login/Login'
import WebNavBar from '../layout/WebNavBar'
import PrivateRoute from '../utils/PrivateRoute'
import AppServerIndex from '../modules/appServer/AppServerIndex'
import store from '../redux/store'
import './App.css'
import { Cargando } from '../utils/Cargando'

class App extends React.Component {

  constructor() {
    super()
    this.state = { theme: 'Light' }
  }

  componentDidMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }

  getMainContent() {
    if (!this.state.rehydrated) {
      return <Cargando />
    } else {
      return <Grid fluid >
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact={true} path="/" permiso={true} component={Home} />
          <PrivateRoute exact={true} path="/appServer" permiso={true} component={AppServerIndex} />
        </Switch>
      </Grid>
    }
  }

  render() {
    return (
      <div>
        <WebNavBar />
        {this.getMainContent()}
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {
  }
}

export default withRouter(connect(mapStateToProps)(App))