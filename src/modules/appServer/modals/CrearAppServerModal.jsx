import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Button, FormControl, FormGroup, ControlLabel, HelpBlock, Modal } from 'react-bootstrap'
import { createAppServer } from '../appServerReducer'
import { Dialogo } from '../../../utils/Dialogo'
import { Campo } from '../../../utils/Campo'

export class CrearAppServerModal extends React.Component {

  constructor() {
    super()
    this.state = {
      createForm: {
        nombre: { error: false, mensaje: '' },
      }
    }
    this.abrirModal = this.abrirModal.bind(this)
    this.cerrarModal = this.cerrarModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  resetCreateForm() {
    let createForm = {
      nombre: { error: false, mensaje: '' },
    }
    this.setState({ ...this.state, createForm: createForm })
  }

  validarCreateForm(nombre) {
    let formOk = true

    let createForm = {
      nombre: { error: false, mensaje: '' },
    }

    if (nombre == null || nombre == '') {
      createForm.nombre.error = true
      createForm.nombre.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.nombre.error = false
      createForm.nombre.mensaje = ''
    }

    this.setState({ ...this.state, createForm: createForm })

    return formOk
  }

  abrirModal() {
    this.resetCreateForm()
    this.setState({ show: true })
  }

  cerrarModal() {
    this.resetCreateForm()
    this.setState({ show: false })
  }

  onSubmit() {
    let nombre = this.nombreInput.value
    if (this.validarCreateForm(nombre)) {
      this.props.createAppServer(nombre, this.props.token)
      this.cerrarModal()
    }
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.cerrarModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Nuevo App Server</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row key={'formCreateRow1'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.createForm.nombre.error)? 'error' : null}>
                <ControlLabel>Nombre</ControlLabel>
                <FormControl inputRef={input => this.nombreInput = input} key="nombreInput" bsSize="small"
                  type="text" placeholder="ingresá un nombre">
                </FormControl>
              </FormGroup>
              {this.state.createForm.nombre.error &&
                <HelpBlock bsSize="small" >{this.state.createForm.nombre.mensaje}</HelpBlock>}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize={'small'} onClick={this.cerrarModal}>Cancelar</Button>&nbsp;
          <Button key={'createAppServerButton'} bsSize={'small'} bsStyle={'primary'} onClick={this.onSubmit}>Crear</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatch = (dispatch) => ({
  createAppServer: (nombreAppServer, token) => {
    dispatch(createAppServer(nombreAppServer, token))
  }
})

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps, mapDispatch, null, { withRef: true })(CrearAppServerModal)