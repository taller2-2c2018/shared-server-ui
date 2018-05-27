import { getConfig, getPostAppServerBody, api } from '../../api/apiInterfaceProvider'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

const HYDRATE_USERS = 'HYDRATE_USERS'
const SET_ACTIVE_USER = 'SET_ACTIVE_USER'
const QUERY_ERROR = 'QUERY_ERROR'
const INTERNAL_ERROR = 'INTERNAL_ERROR'

const initialState = {
  USERS: [],
  alert: {},
  active: null,
}

export const queryError = err => ({
  type: QUERY_ERROR, err
})

// 

export const internalError = err => ({
  type: INTERNAL_ERROR, err
})

// Action creators
export const hydrateUsers = data => ({
  type: HYDRATE_USERS, data
})

export const setActiveUser = id => ({
  type: SET_ACTIVE_USER, id
})

// Thunks
export const getUsers = () => dispatch => {
  let config = getConfig()
  axios.get(api.appServers, config)
    .then(res => res.data)
    .then(data => {
      dispatch(hydrateAppServers(data))
    })
    .catch(err => {
      dispatch(queryError(err))
    })
}

export const fetchMetrics = () => dispatch => {
  let data = [
    {x: moment('2018-01-01 10:00:00', 'Y-m-d H:m:s').valueOf(), y: 500},
    {x: moment('2018-01-01 11:00:00', 'Y-m-d H:m:s').valueOf(), y: 600},
    {x: moment('2018-01-01 12:00:00', 'Y-m-d H:m:s').valueOf(), y: 700},
    {x: moment('2018-01-01 13:00:00', 'Y-m-d H:m:s').valueOf(), y: 700},
    {x: moment('2018-01-01 14:00:00', 'Y-m-d H:m:s').valueOf(), y: 200},
    {x: moment('2018-01-01 15:00:00', 'Y-m-d H:m:s').valueOf(), y: 400},
    {x: moment('2018-01-01 16:00:00', 'Y-m-d H:m:s').valueOf(), y: 500},
    {x: moment('2018-01-01 17:00:00', 'Y-m-d H:m:s').valueOf(), y: 600},
    {x: moment('2018-01-01 18:00:00', 'Y-m-d H:m:s').valueOf(), y: 600},
    {x: moment('2018-01-01 19:00:00', 'Y-m-d H:m:s').valueOf(), y: 1000},
    {x: moment('2018-01-01 20:00:00', 'Y-m-d H:m:s').valueOf(), y: 1000},
    {x: moment('2018-01-01 21:00:00', 'Y-m-d H:m:s').valueOf(), y: 700},
    {x: moment('2018-01-01 22:00:00', 'Y-m-d H:m:s').valueOf(), y: 600},
    {x: moment('2018-01-01 23:00:00', 'Y-m-d H:m:s').valueOf(), y: 500},
    {x: moment('2018-01-02 00:00:00', 'Y-m-d H:m:s').valueOf(), y: 400},
    {x: moment('2018-01-02 01:00:00', 'Y-m-d H:m:s').valueOf(), y: 800},
    {x: moment('2018-01-02 02:00:00', 'Y-m-d H:m:s').valueOf(), y: 900},
  ]

  dispatch(setActiveMetricsData(data))
}

export const getAppServerDetail = (appServerId) => dispatch => {
  dispatch(setActiveAppServer(appServerId))
  dispatch(fetchMetrics())
}

export const createAppServer = (nombre, url) => dispatch => {
  let config = getConfig()
  let body = getPostAppServerBody(nombre, url)
  axios.post(api.appServers, body, config)
    .then(() => {
      dispatch(getAppServers())
    })
    .catch(err => {
      dispatch(queryError(err))
    })
}

export const deleteAppServer = (serverId) => dispatch =>{
  let config = getConfig()
  axios.delete(api.appServer(serverId), config)
    .then(res => res.data.data)
    .then(() => {
      dispatch(getAppServers())
    })
    .catch(err => {
      dispatch(queryError(err))
    })
} 

const fetchAppServersTable = (data) => {
  let returnValue = []
  data.map(function (rowObject) {
    returnValue.push({ id: rowObject.id, name: rowObject.name, url: rowObject.url, created_by: rowObject.created_by, created_at: rowObject.created_at })
  })
  return returnValue
}

const fetchAppServerById = (appServers, id) => {
  return _.find(appServers, { id: id })
}


export default (state = initialState, action) => {
  switch (action.type) {
  case HYDRATE_APP_SERVERS:
    return {
      ...state,
      appServers: fetchAppServersTable(action.data.Servers),
    }
  case SET_ACTIVE_APP_SERVER:
    return {
      ...state,
      active: fetchAppServerById(state.appServers, action.id)
    }
  case SET_ACTIVE_METRICS:
    return {
      ...state,
      activeMetricsData: action.data
    }  
  default:
    return state
  }
}
