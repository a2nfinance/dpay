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
        <Row gutter={8}>
            {
                subDaos.map((dao, index) => {
                    return <Col key={`sub-dao-${index}`} xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                        <Item key={index} dao={dao} />
                    </Col>

                })
            }

        </Row>
    )
}