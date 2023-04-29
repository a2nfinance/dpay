import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

import { formLayout, formStyle } from "src/theme/layout"
export const Governance = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
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
