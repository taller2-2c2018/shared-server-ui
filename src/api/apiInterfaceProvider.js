export const getConfig = (token) => ({
  headers: {
    'Authorization': token,
  }
})

export const getErrorResponse = (err) => {
  return { status: err.response.status, message: err.response.data.message.msg }
}

export const getPostAppServerBody = (nombre) => ({
  id: null,
  name: nombre,
  _rev: null,
  created_by: 1,
  created_at: null,
  last_connection: null
})
