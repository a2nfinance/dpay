import { ArrowUpOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Form, Input, Radio, Row, Space, Statistic, Switch, Table } from "antd";
import { useState } from "react";

export const Details = () => {
    const [form] = Form.useForm();
    const [paymentType, setPaymentType] = useState(1)

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    const dataSource = [
        {
            key: '1',
            address: 'Mike',
            amount: 10,
        },
        {
            key: '2',
            address: 'Mike',
            amount: 20,
        },
    ];

    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Amount',
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
                                value={10}
                                precision={0}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Statistic
                                title="Voted"
                                value={5}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<CheckCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Statistic
                                title="Devoted"
                                value={5}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<CloseCircleOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
                <Form.Item>
                    <Switch checkedChildren="Voted" unCheckedChildren="Devoted" defaultChecked />
                </Form.Item>
            </Card>

            <Divider />
            <Card size="small" title="General">
                <Form.Item name="title" rules={[{ required: true, message: 'Missing title' }]}>
                    <Input size={"large"} placeholder="Title" />
                </Form.Item>
                <Form.Item name="description" rules={[{ required: true, message: 'Missing description' }]}>
                    <Input size={"large"} placeholder="Description" />
                </Form.Item>
            </Card>
            <Divider />
            <Card size="small" title="Payment Settings">
                <Form.Item name="payment_type" >
                    <Radio.Group defaultValue={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                        <Radio value={1}>Instant Payment</Radio>
                        <Radio value={2}>Locked Time Payment</Radio>
                        <Radio value={3}>Crypto Streaming</Radio>
                    </Radio.Group>
                </Form.Item>
                <Space wrap>
                    <Form.Item label="Start Time" name="start_time" rules={[{ required: paymentType !== 1, message: 'Missing start time' }]}>
                        <Input disabled={paymentType === 1} type="datetime-local" />
                    </Form.Item>
                    <Form.Item label="Stop Time" name="stop_time" rules={[{ required: paymentType === 3, message: 'Missing stop time' }]}>
                        <Input disabled={paymentType !== 3} type="datetime-local" />
                    </Form.Item>
                </Space>
                {
                    paymentType === 1 && <p>When a proposal is executed, all payouts are sent</p>
                }
                {paymentType === 2 && <p>A proposal can be executed when start time is reached, all payouts are sent.</p>}
                {paymentType == 3 && <p>Token amount will be released every second. Recipient or Member can executed the proposal multitime, each calculated amount of token will be sent to each recipient </p>}
            </Card>
            <Divider />
            <Card size="small" title="Recipients">
                <Table dataSource={dataSource} columns={columns} />
            </Card>

        </Form>
    )
}