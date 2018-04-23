import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getAppServerDetail } from './appServerReducer'
import { Row, Col, Label } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import RequestsGraph from './RequestsGraph'
import { Cargando } from '../../utils/Cargando'


export class AppServerIndex extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getAppServerDetail(this.props.match.params.id)
  }

  abrirCrearAppServerModal() {
    this.crearAppServerModal.wrappedInstance.abrirModal()
  }

  render() {
    if (this.props.active != null) {
      return (
        <Fragment>
          <Row>
            <Col md={12}>
              <h2>App server: {this.props.active.name} </h2>
              <Label>
                Online
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h4>Requests / hora</h4>            
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <RequestsGraph />
            </Col>
          </Row>
        </Fragment>
      )
    } else {
      return <Cargando />
    }
  }
}

const mapStateToProps = (state) => ({
  active: state.appServerReducer.active
})

const mapDispatch = (dispatch) => ({
  getAppServerDetail: (id) => {
    dispatch(getAppServerDetail(id))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatch)(AppServerIndex))
