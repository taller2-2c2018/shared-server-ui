/* Dependencies */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

/* Import Other Reducers */
import authReducer from '../modules/login/authReducer'
import appServerReducer from '../modules/appServer/appServerReducer'

/* Combine & Export Reducers to Store */
const appReducer = combineReducers({
  authReducer: authReducer,
  appServerReducer: appServerReducer,
  routerReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer