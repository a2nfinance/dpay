import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Segmented, Space } from 'antd';
import { setDaoFormProps } from 'src/controller/dao/daoFormSlice';
import { useAppDispatch } from 'src/controller/hooks';

import { formLayout, formStyle } from "src/theme/layout"
export const Governance = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        dispatch(setDaoFormProps({
            att: "step",
            value: 2
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
            <Form.Item name="open" initialValue={1} >
                <Radio.Group>
                    <Radio value={1}>Invited Members Only</Radio>
                    <Radio value={2}>Anyone can join</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.List name="members">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }, index) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    label={`Member (${index + 1})`}
                                    {...restField}
                                    name={[name, 'address']}
                                    rules={[{ required: true, message: 'Missing address' }]}
                                >
                                    <Input size='large' placeholder="Member Address" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add member
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Continue
                </Button>
            </Form.Item>
        </Form>
    )
}
