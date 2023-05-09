
import { CopyOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import { useEffect } from "react";
import { useAppSelector } from "src/controller/hooks";
import { getMembers, leaveDao, removeMember as removeMemberAction } from "src/core";

export const Members = () => {
    const {members, currentDaoAddress, simpleData} = useAppSelector(state => state.daoDetail)
    const {address} = useAppSelector(state => state.wallet)
    const {removeMember, leave} = useAppSelector(state => state.process)
 
    const columns = [
        {
            title: 'Address',
            key: 'address',
            dataIndex: "address",
            render: (_, record) => (
                <Button icon={<CopyOutlined />} onClick={() => navigator.clipboard.writeText(record.address)}>{record.address}</Button>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => {
                if (simpleData.open && address === record.address) {
                    return  <Button loading={leave.processing} onClick={() => leaveDao()} danger>Leave</Button>
                } else {
                    return  <Button loading={removeMember.processing} onClick={() => removeMemberAction(record.address)} danger>Remove</Button>
                }
               
            }

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