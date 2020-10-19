import {combineReducers} from 'redux'
import autheReducer from './auth.reducer'
import userReducer from './user.reducer'

const  rootReducer = combineReducers({
    auth: autheReducer,
    user: userReducer
})

export default rootReducer

 