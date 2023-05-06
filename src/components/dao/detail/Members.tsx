
import { CopyOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import { useEffect } from "react";
import { useAppSelector } from "src/controller/hooks";
import { getMembers } from "src/core";

export const Members = () => {
    const {members, currentDaoAddress} = useAppSelector(state => state.daoDetail)
    const colorMap = {
        "Instant": "blue",
        "Locked Time": "geekblue",
        "Stream": "purple"
    }
 
    const columns = [
        {
            title: 'Address',
            key: 'address',
            dataIndex: "address",
            render: (_, record) => (
                <Button icon={<CopyOutlined />}>{record.address}</Button>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button onClick={() => {}} danger>Remove</Button>
            )

        },
    ];


    useEffect(() => {
        getMembers();
    }, [currentDaoAddress])

    return (
        <>
            <Table dataSource={
                members.map((member, index) => {
                    return {
                        key: index,
                        address: member
                    }
                })
            } columns={columns} />
        </>
    )
}