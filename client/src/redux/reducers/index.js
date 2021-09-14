import { combineReducers } from 'redux'
import providerReducers from './providers'

export default combineReducers({
    providers: providerReducers
})