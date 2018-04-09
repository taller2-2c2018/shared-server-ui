import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getAppServers } from './appServerReducer'
import { Row, Col, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import AppServerTable from './AppServerTable'
import CrearAppServerModal from './modals/CrearAppServerModal'

export class AppServerIndex extends React.Component {
  constructor() {
    super()

    this.abrirCrearAppServerModal = this.abrirCrearAppServerModal.bind(this)
  }

  componentDidMount() {
    this.props.getAppServers(this.props.token)
  }

  abrirCrearAppServerModal() {
    this.crearAppServerModal.wrappedInstance.abrirModal()
  }

  render() {
    return (
      <Fragment >
        <Row>
          <Col md={12}>
            <h2>App Servers</h2>
            <Button bsStyle="success" onClick={this.abrirCrearAppServerModal} className="pull-right" bsSize="xsmall">
              <i className="fa fa-plus" aria-hidden="true">&nbsp;</i> Nuevo App server
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <AppServerTable />
          </Col>
        </Row>
        <CrearAppServerModal ref={(modal) => { this.crearAppServerModal = modal }} />
      </Fragment>
    )
  }
}

const mapDispatch = (dispatch) => ({
  getAppServers: (token) => {
    dispatch(getAppServers(token))
  }
})

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(AppServerIndex))
