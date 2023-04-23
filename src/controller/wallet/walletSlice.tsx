import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WalletState = {
    ready: boolean,
    address: string,
    networkId: string
}

const initialState: WalletState = {
    ready: false,
    address: "",
    networkId: "",
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: initialState,
    reducers: {
        setProps: (state: WalletState,  action: PayloadAction<{att: string, value: any}>) => {
            state[action.payload.att] = action.payload.value
        }
    }
})
export const { setProps } = walletSlice.actions;
export default walletSlice.reducer;