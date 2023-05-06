import { Col, Row, Table } from "antd";
import { useEffect } from "react";
import { useAppSelector } from "src/controller/hooks";
import { getSubDaosOf } from "src/core";
import { Item } from "../Item";

export const SubDaos = () => {
    const { subDaos, currentDaoAddress } = useAppSelector(state => state.daoDetail)

    useEffect(() => {
        getSubDaosOf()
    }, [currentDaoAddress])
    return (
        <Row>
            {
                subDaos.map((dao, index) => {
                    return <Col key={`dao-${index}`} xs={24} sm={24} md={12} lg={8} xl={6} >
                        <Item key={index} dao={dao} />
                    </Col>

                })
            }

        </Row>
    )
}