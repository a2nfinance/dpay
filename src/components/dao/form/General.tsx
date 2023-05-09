import { Button, Form, Input, Radio } from 'antd';
import { convertStepForm, setDaoFormProps } from 'src/controller/dao/daoFormSlice';
import { useAppDispatch, useAppSelector } from 'src/controller/hooks';
import { formStyle } from "src/theme/layout";

export const General = () => {
    const dispatch = useAppDispatch();
    const {title, description, dao_type} = useAppSelector(state => state.daoForm);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        dispatch(convertStepForm(values))
        dispatch(setDaoFormProps({att: "step", value: 1}))
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
            <Form.Item name="title" initialValue={title} label="Title" rules={[{ required: true, message: 'Missing title' }]}>
                <Input size='large' />
            </Form.Item>
            <Form.Item name="description" initialValue={description} label="Description" rules={[{ required: true, message: 'Missing description' }]}>
                <Input.TextArea size='large' />
            </Form.Item>

            <Form.Item name="dao_type" initialValue={dao_type} >
                <Radio.Group>
                    <Radio value={1}>Membership DAO (Multisig)</Radio>
                    <Radio disabled value={2}>Token-based DAO (coming soon)</Radio>
                    <Radio disabled value={3}>NFT-based DAO (coming soon)</Radio>
                </Radio.Group>
            </Form.Item>
            <p><strong>Membership DAO (Multisig):</strong> Small organization with a few members who are likely to stick around. Members can be added and removed by a vote of existing members.</p>
            <p><strong>Token-based DAO:</strong> Fluid organization with many members who can join and leave as they wish. Members can alter their governance power and participation by exchanging tokens.</p>
            <p><strong>Non-Fungible Token (NFT)-based DAO:</strong> Fluid organization with many members who can join and leave as they wish. Members can alter their governance power and participation by exchanging non-fungible tokens.</p>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Continue
                </Button>
            </Form.Item>
        </Form>
    )
}
