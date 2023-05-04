import { Button, Card, Form, Input, Typography } from "antd"
import { useAppDispatch, useAppSelector } from "src/controller/hooks";
import { MultiSelectMember } from "./form/MultiSelectMember";
const { Title } = Typography;
export const NewSubDao = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { title, description, dao_type } = useAppSelector(state => state.subDaoForm);
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };
    return (
        <Form
            layout="vertical"
            form={form}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item name="title" initialValue={title} label="Title" rules={[{ required: true, message: 'Missing title' }]}>
                <Input size='large' />
            </Form.Item>
            <Form.Item name="description" initialValue={description} label="Description" rules={[{ required: true, message: 'Missing description' }]}>
                <Input.TextArea size='large' />
            </Form.Item>
            <Card size="small" title="Inherit Settings from Parent DAO">
                <Title level={5}>Governance</Title>
                <Title level={5}>Require voting of all member</Title>
            </Card>
            <br />
            <Card size="small" title="Custom Settings">
                <Form.Item label="Members">
                    <MultiSelectMember />
                </Form.Item>
            </Card>
            <br/>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

        </Form>
    )
}