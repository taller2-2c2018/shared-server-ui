import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, FormControl, FormGroup, ControlLabel, HelpBlock, Modal } from 'react-bootstrap'
import { createAppServer } from '../appServerReducer'

export class CrearServerUserModal extends React.Component {

  constructor() {
    super()
    this.state = {
      createForm: this.getNewFormState()
    }
    this.abrirModal = this.abrirModal.bind(this)
    this.cerrarModal = this.cerrarModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  getNewFormState() {
    return {
      nombre: { error: false, mensaje: '' },
      password: { error: false, mensaje: ''},
      passwordConfirm: { error: false , mensaje: ''}
    }
  }

  resetCreateForm() {
    this.setState({ ...this.state, createForm: this.getNewFormState() })
  }

  validarCreateForm(nombre, password, passwordConfirm) {
    let formOk = true

    let createForm = this.getNewFormState()

    if (nombre == null || nombre == '') {
      createForm.nombre.error = true
      createForm.nombre.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.nombre.error = false
      createForm.nombre.mensaje = ''
    }

    if (password == null || password == '') {
      createForm.password.error = true
      createForm.password.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.password.error = false
      createForm.password.mensaje = ''
    }

    if (passwordConfirm == null || passwordConfirm == '') {
      createForm.passwordConfirm.error = true
      createForm.passwordConfirm.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.passwordConfirm.error = false
      createForm.passwordConfirm.mensaje = ''
    }

    if (password != null && passwordConfirm != null && password != passwordConfirm) {
      createForm.passwordConfirm.error = true
      createForm.passwordConfirm.mensaje = 'Las contraseñas no coinciden'
      formOk = false
    } else {
      createForm.passwordConfirm.error = false
      createForm.passwordConfirm.mensaje = ''
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
    let password = this.passwordInput.value
    let passwordConfirm = this.passwordConfirmInput.value

    if (this.validarCreateForm(nombre, password, passwordConfirm)) {
      this.props.createUser(nombre, password, passwordConfirm)
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
          <Row key={'formCreateRow2'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.createForm.password.error)? 'error' : null}>
                <ControlLabel>Url</ControlLabel>
                <FormControl inputRef={input => this.passwordInput = input} key="passwordInput" bsSize="small"
                  type="password" placeholder="ingresá una constraseña">
                </FormControl>
              </FormGroup>
              {this.state.createForm.password.error &&
                <HelpBlock bsSize="small" >{this.state.createForm.password.mensaje}</HelpBlock>}
            </Col>
          </Row>
          <Row key={'formCreateRow3'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.createForm.passwordConfirm.error)? 'error' : null}>
                <ControlLabel>Url</ControlLabel>
                <FormControl inputRef={input => this.passwordConfirmInput = input} key="passwordConfirmInput" bsSize="small"
                  type="password" placeholder="confirmá la constraseña">
                </FormControl>
              </FormGroup>
              {this.state.createForm.passwordConfirm.error &&
                <HelpBlock bsSize="small" >{this.state.createForm.passwordConfirm.mensaje}</HelpBlock>}
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
  createAppServer: (nombreAppServer, urlAppServer) => {
    dispatch(createAppServer(nombreAppServer, urlAppServer))
  }
})

export default connect(null, mapDispatch, null, { withRef: true })(CrearAppServerModal)