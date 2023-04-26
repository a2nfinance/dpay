import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type Proposal = { 
    title: string,
    description: string,
    creator: string,
    proposal_type: number,
    recipients: {
        [key: string]: number
    },
    start_date: number,
    stop_date: number,
    voters: {
        [key: string]: boolean
    },
    executed: boolean
}
export type DAO = {
    owner : string,
    title : string,
    description : string,
    members : string[],
    proposals: {
        [key: number]: Proposal
    },
    member_fund: {
        [key: string]: number
    },
    contributor_fund: {
        [key: string]: number
    },
} 

type DaoState = {
    isLoadingDao: boolean,
    currentDaoAddress: string
    dao: DAO
}

const initialState: DaoState = {
    isLoadingDao: false,
    dao: null,
    currentDaoAddress: null
}

export const daoDetailSlice = createSlice({
    name: 'daoDetail',
    initialState: initialState,
    reducers: {
        setDaoDetailProps: (state: DaoState,  action: PayloadAction<{att: string, value: any}>) => {
            state[action.payload.att] = action.payload.value
        }
    }
})
export const { setDaoDetailProps } = daoDetailSlice.actions;
export default daoDetailSlice.reducer;