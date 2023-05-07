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
    executed: boolean,
    index?: number
}
type SimpleDaoData = {
    owner: string,
    title: string,
    description: string,
    members_length: number,
    proposals_length: number,
    percentage: number,
    status: number,
    open: boolean,
    dao_type: number,
    balance: number
}
type DaoState = {
    simpleData: SimpleDaoData,
    members: string[],
    proposals: [number, Proposal][],
    member_fund: [string, number][],
    contributor_fund: [string, number][],
    subDaos: { owner: string, title: string, description: string }[],
    isLoadingDao: boolean,
    currentDaoAddress: string,
    currentProposal: Proposal

}

const initialState: DaoState = {
    simpleData: {
        owner: "",
        title: "",
        description: "",
        members_length: 0,
        proposals_length: 0,
        percentage: 0,
        status: 0,
        open: false,
        dao_type: 1,
        balance: 0
    },
    members: [],
    proposals: [],
    member_fund: [],
    contributor_fund: [],
    isLoadingDao: false,
    currentDaoAddress: null,
    subDaos: [],
    currentProposal: {
        title: "",
        description: "",
        creator: "",
        proposal_type: 1,
        recipients: {},
        start_date: 0,
        stop_date: 0,
        voters: {},
        executed: false
    }

}

export const daoDetailSlice = createSlice({
    name: 'daoDetail',
    initialState: initialState,
    reducers: {
        setDaoDetailProps: (state: DaoState, action: PayloadAction<{ att: string, value: any }>) => {
            state[action.payload.att] = action.payload.value
        }
    }
})
export const { setDaoDetailProps } = daoDetailSlice.actions;
export default daoDetailSlice.reducer;