import { Button, Card, Form, Input, Space } from 'antd';
import Image from 'next/image';
import { setDaoFormProps } from 'src/controller/dao/daoFormSlice';
import { useAppDispatch, useAppSelector } from 'src/controller/hooks';
import { formStyle } from "src/theme/layout";
const { Meta } = Card;

export const General = () => {
    const {step} = useAppSelector(state => state.daoForm);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        dispatch(setDaoFormProps({
            att: "step",
            value: 1
        }))
    };
    return (
        <Form
            layout="vertical"
            form={form}
            name="dynamic_form_nest_item"
            style={formStyle}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Missing title' }]}>
                <Input size='large' />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Missing description' }]}>
                <Input.TextArea size='large' />
            </Form.Item>

            <Space wrap>
                <Card
                    hoverable
                    style={{ width: 250 }}
                    cover={<Image width={250} height={250} alt="example" src={"/membership.png"} />}>
                    <Meta title="Membership DAO (Multisig)" description="Small organization with a few members who are likely to stick around. Members can be added and removed by a vote of existing members." />
                </Card>
                <Card
                    hoverable
                    style={{ width: 250 }}
                    cover={<Image width={250} height={250} alt="example" src={"/aeternity-ae-logo.png"} />}
                >
                    <Meta title="Token-based DAO" description="Fluid organization with many members who can join and leave as they wish. Members can alter their governance power and participation by exchanging tokens." />
                </Card>
                <Card
                    hoverable
                    style={{ width: 250 }}
                    cover={<Image width={250} height={250} alt="example" src={"/membership.png"} />}
                >
                    <Meta title="Non-Fungible Token (NFT)-based DAO" description="Fluid organization with many members who can join and leave as they wish. Members can alter their governance power and participation by exchanging non-fungible tokens." />
                </Card>
            </Space>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Continue
                </Button>
            </Form.Item>
        </Form>
    )
}
