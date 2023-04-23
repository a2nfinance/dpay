import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import walletReducer from "src/controller/wallet/walletSlice";


export function makeStore() {
    return configureStore({
        reducer: {
            wallet: walletReducer,
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