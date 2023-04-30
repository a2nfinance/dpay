import { Form, Typography } from "antd";
import { formStyle } from "src/theme/layout";
const { Title } = Typography;
export const ReviewAndApprove = () => {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    }
    return (
        <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            style={formStyle}
            autoComplete="off"
        >
            <Title level={4}>New DAO</Title>
            <p>Description</p>
            <Title level={4}>Governance</Title>
            <p>Invited Member Only</p>
        </Form>
    )
}
