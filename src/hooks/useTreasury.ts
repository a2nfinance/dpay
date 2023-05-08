import { AE_AMOUNT_FORMATS, formatAmount } from "@aeternity/aepp-sdk";

export const useTreasury = () => {
    const getTotalMemberFund = (member_fund) => {
        let funds = 0;
        // @ts-ignore
        member_fund.forEach((value, key) => {
            funds += parseFloat(formatAmount(value[1], { targetDenomination: AE_AMOUNT_FORMATS.AE }))
        })

        return funds
    };

    const getTotalContributorFund = (contributor_fund) => {
        let funds = 0;
        // @ts-ignore
        contributor_fund.forEach((value, key) => {
            funds += parseFloat(formatAmount(value[1], { targetDenomination: AE_AMOUNT_FORMATS.AE }))
        })

        return funds
    }

    const getOtherFund = (balance, member_fund, contributor_fund) => {
        let balanceNumber = parseFloat(formatAmount(balance, { targetDenomination: AE_AMOUNT_FORMATS.AE }))
        let funds = 0;
        // @ts-ignore
        member_fund.forEach((value, key) => {
            funds += parseFloat(formatAmount(value[1], { targetDenomination: AE_AMOUNT_FORMATS.AE }))
        })
        contributor_fund.forEach((value, key) => {
            funds += parseFloat(formatAmount(value[1], { targetDenomination: AE_AMOUNT_FORMATS.AE }))
        })
        return balanceNumber - funds
    }

    return { getTotalMemberFund, getTotalContributorFund, getOtherFund };
};