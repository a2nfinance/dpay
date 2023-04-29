import { Table } from "antd";

export const SubDaos = () => {
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
    return (
        <Table dataSource={dataSource} columns={columns} />
    )
}