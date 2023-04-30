import { Button, Divider, Form, Tag, Typography } from "antd";
import { useAppSelector } from "src/controller/hooks";
import { formStyle } from "src/theme/layout";
const { Title } = Typography;
export const ReviewAndApprove = () => {
    const [form] = Form.useForm();
    const { title, description, members, open, percentage } = useAppSelector(state => state.daoForm)
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
            <Title level={4}>{title}</Title>
            <p>{description}</p>
            <Title level={4}>Governance</Title>
            <p>{open ? "Anyone can join" : "Invited Member Only"}</p>
            <Title level={4}>Voting Configuration</Title>
            <p>{percentage === 100 ? "Require voting of all member" : `Above ${percentage} %`}</p>
            <Title level={4}>Members</Title>
            {
                members.map((member, index) => {
                    return <Tag key={`address-${index}`} color="default">{member.address}</Tag>

                })
            }
            <Divider/>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
