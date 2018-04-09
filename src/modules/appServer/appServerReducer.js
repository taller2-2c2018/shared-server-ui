import axios from 'axios'
import api from '../../api/api'
import { getConfig, getPostAppServerBody } from '../../api/apiInterfaceProvider'

const HYDRATE_APP_SERVERS = 'HYDRATE_APP_SERVERS'
const QUERY_ERROR = 'QUERY_ERROR'
const INTERNAL_ERROR = 'INTERNAL_ERROR'

const initialState = {
  result: [],
  alert: {},
}

export const queryError = err => ({
  type: QUERY_ERROR, err
})

export const internalError = err => ({
  type: INTERNAL_ERROR, err
})

// Action creators
export const hydrateAppServers = data => ({
  type: HYDRATE_APP_SERVERS, data
})

// Thunks
export const getAppServers = (token) => dispatch => {
  let config = getConfig(token)
  axios.get(api.appServers, config)
    .then(res => res.data)
    .then(data => {
      dispatch(hydrateAppServers(data))
    })
    .catch(err => {
      dispatch(queryError(err))
    })
}

export const createAppServer = (nombre, token) => dispatch => {
  let config = getConfig(token)
  let body = getPostAppServerBody(nombre)
  axios.post(api.appServers, body, config)
    .then(() => {
      dispatch(getAppServers(token))
    })
    .catch(err => {
      dispatch(queryError(err))
    })
}

const fetchAppServersTable = (data) => {
  let returnValue = []
  data.map(function (rowObject) {
    returnValue.push({ id: rowObject.id, Id: rowObject.id, name: rowObject.name, created_by: rowObject.created_by, created_at: rowObject.created_at })
  })
  return returnValue
}


export default (state = initialState, action) => {
  switch (action.type) {
  case HYDRATE_APP_SERVERS:
    return {
      ...state,
      result: fetchAppServersTable(action.data.Servers),
      alert: {},
    }
  default:
    return state
  }
}
