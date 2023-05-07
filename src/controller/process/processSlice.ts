import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";

export const actionNames = {
    createDao: "createDao",
    createSubDao: "createSubDao",
    createProposal: "createProposal",
    vote: "vote",
    executeProposal: "executeProposal",
    addMember: "addMember",
    removeMember: "removeMember",
    join: "join",
    leave: "leave",
    getDaos: "getDaos",
    getSubDaos: "getSubDaos",
    getProposalsOf: "getProposals",
    getSubDaosOf: "getSubDaosOf",
    addFund: "addFund"
}

export const processKeys = {
    processing: "processing",
}

type Processes = {
    [key: string]:  {
        processing: boolean
    }
}

const initialState: Processes = {
    createDao: {
        processing: false
    },
    createSubDao:  {
        processing: false
    },
    createProposal:  {
        processing: false
    },
    vote: {
        processing: false
    },
    executeProposal: {
        processing: false
    },
    addMember: {
        processing: false
    },
    removeMember: {
        processing: false
    },
    join: {
        processing: false
    },
    leave: {
        processing: false
    },
    getDaos:  {
        processing: false
    },
    getSubDaos:  {
        processing: false
    },
    getProposalsOf:  {
        processing: false
    },
    getSubDaosOf:  {
        processing: false
    },
    addFund: {
        processing: false
    }
}

export const processesSlice = createSlice({
    name: 'process',
    initialState,
    reducers: {
        updateProcessStatus: (state, action: PayloadAction<{actionName: string, att: string, value: boolean}> ) => {
            state[action.payload.actionName][action.payload.att] = action.payload.value;
        },
    }
})

export const { updateProcessStatus } = processesSlice.actions;
export default processesSlice.reducer;