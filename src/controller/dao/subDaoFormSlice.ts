import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DaoFormState = {
    title: string,
    description: string,
    percentage: number,
    open: boolean,
    dao_type: number,
    members: {address: string}[],
    voting_mode: number
}


const initialState: DaoFormState = {
    title: "",
    description: "",
    percentage: 100,
    open: false,
    dao_type: 1,
    members: [],
    voting_mode: 1
}

export const subDaoFormSlice = createSlice({
    name: 'subDaoForm',
    initialState: initialState,
    reducers: {
        setDaoFormProps: (state: DaoFormState, action: PayloadAction<{ att: string, value: any }>) => {
            state[action.payload.att] = action.payload.value
        },
        convertStepForm: (state: DaoFormState, action: PayloadAction<any>) => {
            let payload = action.payload;
            if (payload.title)
                state.title = payload.title
            if (payload.description)
                state.description = payload.description
            // if (payload.dao_type)
            //     state.dao_type = payload.dao_type
            // if (payload.open === 2)
            //     state.open = true
            if (payload.members)
                state.members = payload.members      
            // if (payload.voting_mode) {
            //     state.voting_mode = payload.voting_mode  
            //     state.percentage = payload.voting_mode === 1 ? 100 : payload.percentage
            // }
               
        },
    }
})
export const { setDaoFormProps, convertStepForm } = subDaoFormSlice.actions;
export default subDaoFormSlice.reducer;