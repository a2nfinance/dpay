export const daoTypeMap = {
    1: "Membership DAO (Multisig)",
    2: "Token-based DAO",
    3: "Non-Fungible Token (NFT)-based DAO"
}

export const votingConfigs= (percentage: number) => {
    if (percentage == 100) {
        return "All-member vote required for proposal execution."
    } else {
        return `Above ${percentage} %`
    }

}

export const governanceConfigs = (open: boolean) => {
    if (open) {
        return "Open to all"
    } else {
        return "Invited members only"
    }
}