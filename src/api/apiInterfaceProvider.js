
const getStoredToken = () => (localStorage.getItem('token'))

export const getConfig = () => ({
  headers: {
    'Authorization': getStoredToken(),
  }
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
