
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
    const dataSource = [
        {
            key: '1',
            title: 'Mike',
        },
        {
            key: '2',
            title: 'Mike',
        },
    ];

    const columns = [
        {
            title: 'Address',
            key: 'paymentType',
            render: (_, record) => (
                <Tag color={colorMap[record.paymentType]}>{record.paymentType}</Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button onClick={() => {}}>Remove</Button>
            )

        },
    ];


    useEffect(() => {
        getMembers();
    }, [currentDaoAddress])

    return (
        <>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}