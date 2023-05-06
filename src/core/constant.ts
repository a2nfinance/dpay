export const daoTypeMap = {
    1: "Membership DAO (Multisig)",
    2: "Token-based DAO",
    3: "Non-Fungible Token (NFT)-based DAO"
}

export const governanceConfigs= (percentage: number) => {
    if (percentage == 100) {
        return "Required votes of all members"
    } else {
        return `Percentage of Voters greater than ${percentage}`
    }

}

export const votingConfigs = (open: boolean) => {
    if (open) {
        return "Anyone can join"
    } else {
        return "Invited members only"
    }
}