import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DAO = {
    [key: string] : {
        owner: string
        title: string,
        description: string,
    }

}

type DaoState = {
    isLoadingDaos: boolean,
    isLoadingSubDaos: boolean,
    daos: DAO[],
    subDaos: DAO[]
}

const initialState: DaoState = {
    isLoadingDaos: false,
    isLoadingSubDaos: false,
    daos: [],
    subDaos: []
}

export const daoSlice = createSlice({
    name: 'dao',
    initialState: initialState,
    reducers: {
        setDaoProps: (state: DaoState,  action: PayloadAction<{att: string, value: any}>) => {
            state[action.payload.att] = action.payload.value
        }
    }
})
export const { setDaoProps } = daoSlice.actions;
export default daoSlice.reducer;