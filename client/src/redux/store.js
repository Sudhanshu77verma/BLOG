import {configureStore,combineReducers} from '@reduxjs/toolkit'
import  userReducer from "./user/userSlice.js"
import themReducer from "./theme/themeslice.js"
import {persistReducer, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"

const rootreducer=combineReducers({
    user:userReducer,
    theme:themReducer,
    
})

const persistConfig={
    key:'root',
    storage,
    version:1
}
const persistReduce=persistReducer(persistConfig,rootreducer)


export const store =configureStore({
    reducer:persistReduce,
        middleware:(getDefaultMiddleware)=>(
            getDefaultMiddleware({serializableCheck:false})
)
    },
)

export const persistor=persistStore(store);
