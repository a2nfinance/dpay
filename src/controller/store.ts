import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import walletReducer from "src/controller/wallet/walletSlice";
import daoReducer from "src/controller/dao/daoSlice";
import daoDetailReducer from "src/controller/dao/daoDetailSlice";
import processReducer from "src/controller/process/processSlice";
// const persistConfig = {
//     key: 'wallet',
//     storage,
// }
// const wallet = persistReducer(persistConfig, walletReducer)

export function makeStore() {
    return configureStore({
        reducer: {
            wallet: walletReducer,
            dao: daoReducer,
            process: processReducer,
            daoDetail: daoDetailReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
    >

export const persistor  = persistStore(store)    