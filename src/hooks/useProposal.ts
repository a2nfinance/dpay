import { AE_AMOUNT_FORMATS, formatAmount } from "@aeternity/aepp-sdk";
import { Proposal } from "src/controller/dao/daoDetailSlice";

export const useProposal = () => {
    const convertDataToArray = (proposals: [number, Proposal][]) => {

        let convertedData = proposals.map(pa => {
            let totalPayout = 0;
            // @ts-ignore
            pa[1].recipients.forEach((value, key) => {
                totalPayout += parseFloat(formatAmount(value, { targetDenomination: AE_AMOUNT_FORMATS.AE }))
            })
            return { ...pa[1], index: pa[0], totalPayout: totalPayout }
        })
        return convertedData;
    };

    const convertRecipientToArray = (recipients: { [key: string]: number }) => {
        let convertedRecipients = [];
        // @ts-ignore
        recipients.forEach((value, key) => {
            convertedRecipients.push({
                address: key,
                amount: parseFloat(formatAmount(value, { targetDenomination: AE_AMOUNT_FORMATS.AE }))
            })
        })
        console.log(recipients, convertedRecipients)
        return convertedRecipients;
    }


    const countVote = (voters: { [key: string]: boolean }) => {
        let count = 0;
        // @ts-ignore
        voters.forEach((value, key) => {
           if (value) count++; 
        })

        return count;
    }

    const countUnvote = (voters: { [key: string]: boolean }) => {
        let count = 0;
        // @ts-ignore
        voters.forEach((value, key) => {
           if (!value) count++; 
        })

        return count;
    }

    const checkUserVoted = (voters: { [key: string]: boolean }, address: string) => {
        let flag = false;
        // @ts-ignore
        voters.forEach((value, key) => {
           if (key == address) flag = true; 
        })

        return flag;
    }

    return { convertDataToArray, convertRecipientToArray, countVote, countUnvote, checkUserVoted };
};