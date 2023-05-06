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
    member_length: number,
    proposal_length: number,
    percentage: number,
    status: number,
    open: boolean,
    dao_type: number,
    balance: number
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
    simpleData: {
        owner : "",
        title : "",
        description : "",
        member_length: 0,
        proposal_length: 0,
        percentage: 0,
        status: 0,
        open: false,
        dao_type: 1,
        balance: 0
    },
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