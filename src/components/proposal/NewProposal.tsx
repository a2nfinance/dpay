import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Drawer, Form, Input, Radio, Space } from "antd"
import { useState } from "react";
import { useAppSelector } from "src/controller/hooks";
import { createProposal as createProposalAction } from "src/core";

export const NewProposal = () => {
    const [form] = Form.useForm();
    const [paymentType, setPaymentType] = useState(1)
    const {createProposal} = useAppSelector(state => state.process)

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        createProposalAction(values);
    };
    return (
        <Form onFinish={onFinish}>
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
                <Form.Item name="payment_type" initialValue={1} >
                    <Radio.Group onChange={(e) => setPaymentType(e.target.value)}>
                        <Radio value={1}>Instant Payment</Radio>
                        <Radio value={2}>Locked Time Payment</Radio>
                        <Radio value={3} disabled>Crypto Streaming (coming soon)</Radio>
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
                <p><strong>Instant Payment:</strong> When a proposal is executed, all payouts are sent</p>
                <p><strong>Locked Time Payment:</strong> A proposal can be executed when start time is reached, all payouts are sent.</p>
                <p><strong>Crypto Streaming:</strong> Token amount will be released every second. Recipient or Member can executed the proposal multitime, each calculated amount of token will be sent to each recipient </p>
            </Card>
            <Divider />
            <Card size="small" title="Recipients">
                <Form.List name="recipients">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'address']}
                                        rules={[{ required: true, message: 'Missing address' }]}
                                    >
                                        <Input size='large' placeholder="Address" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'amount']}
                                        rules={[{ required: true, message: 'Missing amount' }]}
                                    >
                                        <Input size='large' placeholder="Amount" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Recipient
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

            </Card>
            <Divider />
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={createProposal.processing}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}