import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

export class AppServerIndex extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <h2>Administración de App Servers</h2>
        </Col>
      </Row>
    )
  }
}

export default withRouter(connect(null, null)(AppServerIndex))
