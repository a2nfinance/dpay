import { useRouter } from "next/router"
import { useEffect } from "react";
import { DaoStatistic } from "src/components/dao/detail/DaoStatistic";
import { DaoTabs } from "src/components/dao/detail/DaoTabs";
import { getDaoDetail } from "src/core";

export default function DaoAddress() {
    const router = useRouter()
    const { address } = router.query;

    useEffect(() => {
        if (address) {
            getDaoDetail(address.toString())  
        }
    }, [address])

    return (
        <>
            <DaoStatistic />
            <DaoTabs />
        </>
    )
}

