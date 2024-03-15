import { configureStore } from '@reduxjs/toolkit'
import indexReducer from './reducers/IndexReducer'

const initialState = {}

const Store = configureStore({ 
  reducer:indexReducer,
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;