import { Button, Form, Input, Radio } from 'antd';
import { useState } from 'react';
import { convertStepForm, setDaoFormProps } from 'src/controller/dao/daoFormSlice';
import { useAppDispatch, useAppSelector } from 'src/controller/hooks';
import { formLayout, formStyle } from "src/theme/layout";

export const VotingConfiguration = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const {percentage, voting_mode} = useAppSelector(state => state.daoForm)
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        dispatch(convertStepForm(values))
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
            <Form.Item name="voting_mode" initialValue={voting_mode}>
                <Radio.Group onChange={(e) => dispatch(setDaoFormProps({att: "voting_mode", value: e.target.value}))}>
                    <Radio value={1}>All-member vote required for proposal execution.</Radio>
                    <Radio value={2}>Above a percentage number</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name="percentage" initialValue={percentage} rules={[{ required: voting_mode !== 1, message: 'Missing percentage' }]}>
                <Input type='number' size='large' disabled={voting_mode === 1} placeholder='Percentage Number of Accepted Proposal' suffix="%" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Continue
                </Button>
            </Form.Item>
        </Form>
    )
}
