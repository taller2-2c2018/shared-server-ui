import React from 'react'
import { connect } from 'react-redux'
import logo from '../logo.svg'
import { persistStore } from 'redux-persist'
import { withRouter } from 'react-router-dom'
import store from '../redux/store'
import './App.css'

class App extends React.Component {

  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentDidMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {
  }
}

export default withRouter(connect(mapStateToProps)(App))