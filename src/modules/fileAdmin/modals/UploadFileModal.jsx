import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, FormControl, FormGroup, ControlLabel, HelpBlock, Modal } from 'react-bootstrap'
import { uploadFile } from '../fileReducer'

export class UploadFileModal extends React.Component {

  constructor() {
    super()
    this.state = {
      file: null,
      form: {
        archivo: { error: false, mensaje: '' },
      }
    }
    this.abrirModal = this.abrirModal.bind(this)
    this.cerrarModal = this.cerrarModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.updateFileUpload = this.updateFileUpload.bind(this)
  }

  resetForm() {
    let form = {
      archivo: { error: false, mensaje: '' },
    }
    this.setState({ ...this.state, form: form })
  }

  validarForm(archivo) {
    let formOk = true

    let form = {
      archivo: { error: false, mensaje: '' },
    }

    if (archivo == null || archivo == '') {
      form.archivo.error = true
      form.archivo.mensaje = 'Tenés que seleccionar un archivo'
      formOk = false
    } else {
      form.archivo.error = false
      form.archivo.mensaje = ''
    }

    this.setState({ ...this.state, form: form })

    return formOk
  }

  abrirModal() {
    this.resetForm()
    this.setState({ show: true })
  }

  cerrarModal() {
    this.resetForm()
    this.setState({ show: false })
  }

  onSubmit() {
    let archivo = this.state.file
    if (this.validarForm(archivo)) {
      this.props.uploadFile(archivo)
      this.cerrarModal()
    }
  }

  updateFileUpload(e) {
    this.setState({
      ...this.state,
      file: e.target.files[0]
    })
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.cerrarModal}
        dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Subir archivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row key={'formCreateRow1'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.form.archivo.error)? 'error' : null}>
                <ControlLabel>Archivo</ControlLabel>
                <FormControl onChange={this.updateFileUpload} key="archivoInput" type="file">
                </FormControl>
              </FormGroup>
              {this.state.form.archivo.error &&
                <HelpBlock bsSize="small" >{this.state.form.archivo.mensaje}</HelpBlock>}
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
  uploadFile: (archivo) => {
    dispatch(uploadFile(archivo))
  }
})

export default connect(null, mapDispatch, null, { withRef: true })(UploadFileModal)