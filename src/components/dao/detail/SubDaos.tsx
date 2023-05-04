import { Table } from "antd";
import { useEffect } from "react";
import { useAppSelector } from "src/controller/hooks";
import { getSubDaosOf } from "src/core";

export const SubDaos = () => {
    const {subDaos, currentDaoAddress} = useAppSelector(state => state.daoDetail)
    const dataSource = [
        {
            key: '1',
            address: 'Mike',
            title: "members",
            description: '10 Downing Street',
            type: "Multisig",
            percentage: 51
        },
        {
            key: '2',
            address: 'John',
            title: "members",
            description: '10 Downing Street',
            type: "Multisig",
            percentage: 100
        },
    ];

    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Percentage',
            dataIndex: 'percentage',
            key: 'percentage',
        }
    ];

    useEffect(() => {
        getSubDaosOf()
    }, [currentDaoAddress])
    return (
        <Table dataSource={dataSource} columns={columns} />
    )
}