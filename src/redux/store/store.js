import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import counterReducer from '../slices/counterSlice'
import localStorage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage: localStorage
}

// const persistedUserReducer = persistReducer(persistConfig, userReducer);


const store = configureStore({
    reducer: {
        counterReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store)

export default store