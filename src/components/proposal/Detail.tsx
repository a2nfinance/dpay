import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Row, Space, Statistic, Table } from "antd";
import { useAppSelector } from "src/controller/hooks";
import { executeProposal as executeProposalAction, vote as voteAction } from "src/core";
import { useProposal } from "src/hooks/useProposal";

export const Details = () => {
    const { currentProposal, simpleData } = useAppSelector(state => state.daoDetail);
    const { address } = useAppSelector(state => state.wallet)
    const { convertRecipientToArray, countUnvote, countVote, checkUserVoted } = useProposal();
    const { vote, executeProposal } = useAppSelector(state => state.process);
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (_, record) => (
                <Button icon={<CopyOutlined />} onClick={() => navigator.clipboard.writeText(record.address)}>{record.address}</Button>
            )
        },
        {
            title: 'Amount (AE)',
            dataIndex: 'amount',
            key: 'amount',
        }
    ];
    return (
        <Form onFinish={onFinish}>
            <Card title="Voting Status" size="small">
                <Row gutter={8}>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Statistic
                                title="Members"
                                value={simpleData.members_length}
                                precision={0}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Statistic
                                title="Voted"
                                value={countVote(currentProposal.voters)}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Statistic
                                title="Unvoted"
                                value={countUnvote(currentProposal.voters)}
                                valueStyle={{ color: '#cf1322' }}
                            />
                        </Card>
                    </Col>
                </Row>
                <Divider />
                <Space wrap>
                    {
                        checkUserVoted(currentProposal.voters, address) ? (<>
                            <Button disabled type="primary">Voted</Button>
                            <Button disabled={vote.processing || currentProposal.executed} onClick={() => voteAction(currentProposal.index, false)}>Unvote</Button>
                            {
                                ((countVote(currentProposal.voters) * 100 / parseInt(simpleData.members_length.toString())) >= parseInt(simpleData.percentage.toString())) ? (<>
                                    <Button disabled={currentProposal.executed} type="primary" loading={executeProposal.processing} onClick={() => executeProposalAction(currentProposal.index)}>Executed Proposal</Button>
                                </>) : (<></>)
                            }
                        </>) : (<>
                            <Button disabled={vote.processing || currentProposal.executed} type="primary" onClick={() => voteAction(currentProposal.index, true)}>Vote</Button>
                            <Button disabled={vote.processing || currentProposal.executed} onClick={() => voteAction(currentProposal.index, false)}>Unvote</Button>
                        </>)
                    }

                </Space>

            </Card>

            <Divider />
            <Card size="small" title="Recipients">
                <Table dataSource={convertRecipientToArray(currentProposal.recipients)} columns={columns} />
            </Card>

        </Form>
    )
}