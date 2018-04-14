import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Alert, Table } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import history from '../../redux/history'

export class AppServerTable extends React.Component {

  constructor() {
    super()
    this.getHeaders = this.getHeaders.bind(this)
  }

  editAction(id) {
    history.push('/appServers/' + id)
  }

  deleteAction() {
    return
  }

  getHeaders() {
    let headers = ['id', 'Nombre', 'Creado por', 'Fecha de alta'], i, returnHeaders = []
    for (i in headers) { 
      returnHeaders.push(<th key={i}>{headers[i]}</th>) 
    }
    returnHeaders.push(<th className="text-right" key={'acciones'} ></th>)
    return returnHeaders
  }

  getTableRows() {
    let data = this.props.result, editAction = this.editAction, deleteAction = this.deleteAction

    var tableRow = data.map(function (rowObject) {
      let i
      var returnValue = []

      for (i in rowObject) {
        returnValue.push(
          <td key={i}>
            {rowObject[i]}
          </td>)
      }
      returnValue.push(
        <td className="text-right" colSpan="1" key={'acciones'}>
          <a href="javascript:void(0)">
            <i className="fa fa-pencil" title="Editar" onClick={() => editAction(rowObject.id)}></i>
          </a>&nbsp;&nbsp;&nbsp;
          <a href="javascript:void(0)" >
            <i className="fa fa-remove action" title="Eliminar" onClick={() => deleteAction(rowObject.id)}></i>
          </a>
        </td>)

      return (<tr key={rowObject.id}>
        {returnValue}
      </tr>)
    })
    return tableRow
  }

  render() {

    if (this.props.result.length == 0) {

      return (
        <Fragment>
          <br />
          <Alert bsStyle="info">La búsqueda no trajo resultados</Alert>
        </Fragment>)
    }
    return (
      <Table condensed striped hover responsive>
        <thead>
          <tr>
            {this.getHeaders()}
          </tr>
        </thead>
        <tbody>
          {this.getTableRows()}
        </tbody>
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    result: state.appServerReducer.result
  }
}

export default withRouter(connect(mapStateToProps, null)(AppServerTable))