import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getAppServerDetail } from './appServerReducer'
import { Row, Col, Label, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import RequestsGraph from './RequestsGraph'
import { Cargando } from '../../utils/Cargando'
import history from '../../redux/history'

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
              <Label bsStyle={this.props.data?'success':'danger'}>
                {this.props.data?'Online':'Offline'}
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h4>Requests / hora</h4>            
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <RequestsGraph />
            </Col>
            <Col lg={12}>
              <Button bsStyle="default" bsSize="small" onClick={history.goBack}>Volver</Button>
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
  active: state.appServerReducer.active,
  data: state.appServerReducer.activeMetricsData
})

const mapDispatch = (dispatch) => ({
  getAppServerDetail: (id) => {
    dispatch(getAppServerDetail(id))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatch)(AppServerIndex))
