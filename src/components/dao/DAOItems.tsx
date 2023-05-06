import { useAppSelector } from "src/controller/hooks";
import { Item } from "./Item";
import { useEffect } from "react";
import { getDaos } from "src/core";
import { Col, Row } from "antd";

export const DAOItems = () => {
    const {daos} = useAppSelector(state => state.dao)
    useEffect(() => {
        getDaos()
    }, [])
    return (
        <Row>
        {
             daos.map((dao, index) => {
                return <Col key={`dao-${index}`} xs={24} sm={24} md={12} lg={8} xl={6} >
                 <Item key={index} dao={dao}/>
                </Col>
               
            })
        }
        
        </Row>
       
    )
}