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
type SimpleDaoData = {
    owner : string,
    title : string,
    description : string,
}
type DaoState = {
    simpleData: SimpleDaoData,
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
    subDaos: {owner: string, title: string, description: string}[],
    isLoadingDao: boolean,
    currentDaoAddress: string
    
}

const initialState: DaoState = {
    simpleData: null,
    members: [],
    proposals: {},
    member_fund: {},
    contributor_fund: {},
    isLoadingDao: false,
    currentDaoAddress: null,
    subDaos: [],

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