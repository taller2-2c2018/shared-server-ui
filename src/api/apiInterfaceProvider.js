
import { BASE } from './api'

// Api routes phrases
const LOGIN = 'token'
const APPSERVERS = 'servers'
const FILES = 'files'

export const api = {
  base: BASE,
  login: BASE + LOGIN,
  appServers: BASE + APPSERVERS,
  files: BASE + FILES,
  appServer: (id) => {
    return BASE + APPSERVERS + '/' + id
  },
  file: (id) => {
    return BASE + FILES + '/' + id
  },
}

const getStoredToken = () => (localStorage.getItem('token'))

export const getConfig = () => ({
  headers: {
    'Authorization': getStoredToken(),
  }
})

export const getMultipartFormDataConfig = () => ({
  headers: {
    'Authorization': getStoredToken(),
    'content-type': 'multipart/form-data'
  }
})

export const getFileConfig = () => ({
  headers: {
    'Authorization': getStoredToken(),
    
  },
  responseType: 'blob'
})

export const getErrorResponse = (err) => {
  return { status: err.response.status, message: err.response.data.message.msg }
}

export const getPostAppServerBody = (nombre) => ({
  id: null,
  name: nombre,
  _rev: null,
  created_by: null,
  created_at: null,
  last_connection: null
})

export const getPostFileUploadBody = (archivo) => {
  const formData = new FormData()
  formData.append('file', archivo)
  formData.append('id', null)
  formData.append('_rev', null)
  formData.append('resource', null)
  formData.append('created_at', null)
  formData.append('created_by', null)
  formData.append('updated_at', null)
  formData.append('filename', null)
  formData.append('size', null)
  return formData
}