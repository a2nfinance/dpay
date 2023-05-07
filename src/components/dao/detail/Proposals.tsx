
import { Button, Card, Drawer, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Details } from "src/components/proposal/Detail";
import { NewProposal } from "src/components/proposal/NewProposal";
import { setDaoDetailProps } from "src/controller/dao/daoDetailSlice";
import { useAppDispatch, useAppSelector } from "src/controller/hooks";
import { getDaoProposals } from "src/core";
import { useProposal } from "src/hooks/useProposal";

export const Proposals = () => {
    const dispatch = useAppDispatch();
    const { proposals, currentDaoAddress, currentProposal } = useAppSelector(state => state.daoDetail);
    const { convertDataToArray } = useProposal();
    const [openDetail, setOpenDetail] = useState(false);

    const showDrawerDetail = () => {
        setOpenDetail(true);
    };

    const onCloseDetail = () => {
        setOpenDetail(false);
    };
    const colorMap = (pt: number) => {
        let color = "blue";
        if (!pt) return color;
        switch (parseInt(pt.toString())) {
            case 1:
                color = "blue"
                break;
            case 2:
                color = "geekblue";
                break;
            case 3:
                color = "purple";
                break
            default:
                break;
        }
        return color;
    }

    const paymentTypeMap = (pt: number) => {
        let ptype = "instant"
        if (!pt) return ptype;
        switch (parseInt(pt.toString())) {
            case 1:
                ptype = "instant"
                break;
            case 2:
                ptype = "locked time";
                break;
            case 3:
                ptype = "streaming";
                break
            default:
                break;
        }

        return ptype;

    }

    const statusMap = (status: number) => {
        let st = "active"
        if (!status) return st;
        switch (parseInt(status.toString())) {
            case 1:
                st = "active"
                break;
            case 2:
                st = "paused";
                break;
            case 3:
                st = "completed";
                break
            default:
                break;
        }

        return st;

    }

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
            key: 'payment_type',
            render: (_, record) => (
                <Tag color={colorMap(record.payment_type)}>{paymentTypeMap(record.payment_type)}</Tag>
            )
        },
        {
            title: "Payout",
            dataIndex: "totalPayout",
            key: "totalPayout"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <Tag color={colorMap(record.status)}>{statusMap(record.status)}</Tag>
            )
        },
        {
            title: "Executed",
            dataIndex: "executed",
            key: "executed",
            render: (_, record) => (
                <Tag>{record.executed ? "Yes" : "No"}</Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button onClick={() => {
                    console.log("record", record);
                    dispatch(setDaoDetailProps({att: "currentProposal", value: record}))
                    showDrawerDetail()
                }}>More Info</Button>
            )

        },
    ];


    useEffect(() => {
        getDaoProposals()
    }, [currentDaoAddress])

    return (
        <>
            <Table dataSource={convertDataToArray(proposals)} columns={columns} />

            <Drawer title={currentProposal.title} size="large" placement="right" onClose={onCloseDetail} open={openDetail}>
                <Details />
            </Drawer>
        </>
    )
}