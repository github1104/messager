import {combineReducers} from 'redux'
import autheReducer from './auth.reducer'

const  rootReducer = combineReducers({
    auth: autheReducer
})

export default rootReducer

 