import { Button, Col, Descriptions, Divider, Form, Row, Tag, Typography } from "antd";
import { useAppSelector } from "src/controller/hooks";
import { createDAO as createDAOAction } from "src/core";
import { formStyle } from "src/theme/layout";
const { Title } = Typography;
export const ReviewAndApprove = () => {
    const [form] = Form.useForm();
    const { title, description, members, open, percentage } = useAppSelector(state => state.daoForm);
    const { createDao } = useAppSelector(state => state.process);
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        createDAOAction();
    }
    return (
        <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            style={formStyle}
            autoComplete="off"
        >
            <Descriptions title="DAO Settings" layout={"vertical"} column={{ xs: 1, lg: 2 }}>
                <Descriptions.Item label={"Title"}>{title}</Descriptions.Item>
                <Descriptions.Item label={"Description"}>{description}</Descriptions.Item>
                <Descriptions.Item label={"Governance"}>{open ? "Open to all" : "Invited Member Only"}</Descriptions.Item>
                <Descriptions.Item label={"Voting Configuration"}>{percentage === 100 ? "All-member vote required for proposal execution." : `Above ${percentage} %`}</Descriptions.Item>
                <Descriptions.Item label={"Members"} contentStyle={{display: "block"}}>
             
                        {
                            members.map((member, index) => {
                                return (
                                      
                                        <Tag key={`address-${index}`} color="blue" style={{marginBottom: "5px"}}>{member.address}</Tag>
                                       
                                    )

                            })
                        }
                   
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={createDao.processing}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
