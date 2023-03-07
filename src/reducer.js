import { combineReducers } from 'redux'
import { btcWalletReducer } from './components/BTCWallet/btcWalletSlice'


const rootReducer = combineReducers({
  wallets: btcWalletReducer,
})

export default rootReducer
