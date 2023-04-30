import { Button, Form, Input, Radio } from 'antd';
import { useState } from 'react';
import { setDaoFormProps } from 'src/controller/dao/daoFormSlice';
import { useAppDispatch } from 'src/controller/hooks';
import { formLayout, formStyle } from "src/theme/layout";

export const VotingConfiguration = () => {
    const [form] = Form.useForm();
    const [votingMode, setVotingMode] = useState(1)
    const dispatch = useAppDispatch();
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        dispatch(setDaoFormProps({
            att: "step",
            value: 3
        }))
    };
    return (
        <Form
            form={form}
            {...formLayout}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            style={formStyle}
            autoComplete="off"
        >
            <Form.Item name="open" initialValue={1}>
                <Radio.Group onChange={(e) => setVotingMode(e.target.value)}>
                    <Radio value={1}>All members</Radio>
                    <Radio value={2}>A percentage number</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name="percentage" initialValue={100} rules={[{ required: votingMode !== 1, message: 'Missing start time' }]}>
                <Input disabled={votingMode === 1} type='number' size='large' placeholder='Percentage Number of Accepted Proposal' suffix="%" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Continue
                </Button>
            </Form.Item>
        </Form>
    )
}
