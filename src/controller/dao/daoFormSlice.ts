import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DaoFormState = {
    title : string,
    description : string,
    percentage: number,
    open: boolean,
    members : string[],
    step: number
} 


const initialState: DaoFormState = {
    title: "",
    description : "",
    percentage: 100,
    open: false,
    members : [],
    step: 0
}

export const daoFormSlice = createSlice({
    name: 'daoForm',
    initialState: initialState,
    reducers: {
        setDaoFormProps: (state: DaoFormState,  action: PayloadAction<{att: string, value: any}>) => {
            state[action.payload.att] = action.payload.value
        }
    }
})
export const { setDaoFormProps } = daoFormSlice.actions;
export default daoFormSlice.reducer;