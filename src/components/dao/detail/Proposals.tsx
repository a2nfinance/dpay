
import { Button, Card, Drawer, Space, Table, Tag } from "antd";
import { useState } from "react";
import { Details } from "src/components/proposal/Detail";
import { NewProposal } from "src/components/proposal/NewProposal";

export const Proposals = () => {
    

    const [openDetail, setOpenDetail] = useState(false);

    const showDrawerDetail = () => {
        setOpenDetail(true);
    };

    const onCloseDetail = () => {
        setOpenDetail(false);
    };
    const colorMap = {
        "Instant": "blue",
        "Locked Time": "geekblue",
        "Stream": "purple"
    }
    const dataSource = [
        {
            key: '1',
            title: 'Mike',
            description: "title",
            paymentType: "Instant",
            payout: 20,
            status: "Processing"
        },
        {
            key: '2',
            title: 'Mike',
            description: "title",
            paymentType: "Locked Time",
            payout: 30,
            status: "Executed"
        },
    ];

    const columns = [
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
            title: 'Payment Type',
            key: 'paymentType',
            render: (_, record) => (
                <Tag color={colorMap[record.paymentType]}>{record.paymentType}</Tag>
            )
        },
        {
            title: "Payout",
            dataIndex: "payout",
            key: "payout"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status"
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button onClick={() => showDrawerDetail()}>Details</Button>
            )

        },
    ];




    return (
        <>
            <Table dataSource={dataSource} columns={columns} />

            <Drawer title="Proposal Detail" size="large" placement="right" onClose={onCloseDetail} open={openDetail}>
                <Details />
            </Drawer>
        </>
    )
}