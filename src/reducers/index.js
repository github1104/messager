import {combineReducers} from 'redux'
import autheReducer from './auth.reducer'
import userReducer from './user.reducer'
import conversation from './conversation'

const  rootReducer = combineReducers({
    auth: autheReducer,
    user: userReducer,

})

export default rootReducer

 