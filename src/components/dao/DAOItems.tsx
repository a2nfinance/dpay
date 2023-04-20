import { Item } from "./Item";

export const DAOItems = () => {
    const a = [1,2,3,4];

    return (
        <>
        {
             a.map(i => {
                return <Item />
            })
        }
        
        </>
       
    )
}