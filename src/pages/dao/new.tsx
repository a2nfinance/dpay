import { Col, Row } from "antd";
import { DAOCreationProgress } from "src/components/dao/DAOCreationProgress";
import { DAOForm } from "src/components/dao/DAOForm";

export default function New() {
    return (

            <Row>
                <Col span={18}><DAOForm /></Col>
                <Col span={6}><DAOCreationProgress /></Col>
            </Row>

    )
}