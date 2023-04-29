import { Col, Row } from "antd";
import { DAOCreationProgress } from "src/components/dao/DAOCreationProgress";
import { General, Governance, ReviewAndApprove, VotingConfiguration } from "src/components/dao/form";
import { useAppSelector } from "src/controller/hooks";

export default function New() {
    const {step} = useAppSelector(state => state.daoForm)
    return (

            <Row>
                <Col span={18}>
                    {
                        step === 0 && <General />
                    }
                    {
                        step === 1 && <Governance />
                    }
                    {
                        step == 2 && <VotingConfiguration/>
                    }
                    {
                        step == 3 && <ReviewAndApprove />
                    }
                </Col>
                <Col span={6}><DAOCreationProgress /></Col>
            </Row>

    )
}