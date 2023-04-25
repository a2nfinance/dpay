import { useAppSelector } from "src/controller/hooks";
import { Item } from "./Item";
import { useEffect } from "react";
import { getDaos } from "src/core";

export const DAOItems = () => {
    const {daos} = useAppSelector(state => state.dao)
    useEffect(() => {
        getDaos()
    }, [])
    return (
        <>
        {
             daos.map((dao, index) => {
                return <Item key={index} dao={dao}/>
            })
        }
        
        </>
       
    )
}