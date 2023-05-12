import { Button, Card, Descriptions, Form, Input, Typography } from "antd";
import { useEffect } from "react";
import { convertStepForm } from "src/controller/dao/subDaoFormSlice";
import { useAppDispatch, useAppSelector } from "src/controller/hooks";
import { createDAO, createSubDAO as createSubDaoAction, getMembers } from "src/core";
import { daoTypeMap, governanceConfigs, votingConfigs } from "src/core/constant";
import { MultiSelectMember } from "./form/MultiSelectMember";

export const NewSubDao = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { title, description } = useAppSelector(state => state.subDaoForm);
    const { currentDaoAddress, simpleData } = useAppSelector(state => state.daoDetail);
    const {createSubDao} = useAppSelector(state => state.process)
    const onFinish = (values: any) => {
        dispatch(convertStepForm(
            values
        ));

        createSubDaoAction();
    };

    useEffect(() => {
        getMembers()
    }, [currentDaoAddress])
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
            <Card size="small" title="Parent DAO">
                <Descriptions column={{ xs: 1, lg: 2 }}>
                    <Descriptions.Item label="Type">{daoTypeMap[simpleData.dao_type]}</Descriptions.Item>
                    <Descriptions.Item label="Governance">{governanceConfigs(simpleData.open)}</Descriptions.Item>
                    <Descriptions.Item label="Voting">{votingConfigs(simpleData.percentage)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <br />
            <Card size="small" title="Select Members">

                <MultiSelectMember />

            </Card>
            <br />
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={createSubDao.processing}>
                    Submit
                </Button>
            </Form.Item>

        </Form>
    )
}