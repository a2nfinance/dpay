
import { Button, Card, Drawer, Space } from "antd";
import { useState } from "react";
import { Details } from "src/components/proposal/Detail";
import { NewProposal } from "src/components/proposal/NewProposal";

export const Proposals = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const [openDetail, setOpenDetail] = useState(false);

    const showDrawerDetail = () => {
        setOpenDetail(true);
    };

    const onCloseDetail = () => {
        setOpenDetail(false);
    };
    return (
        <>
            <Card>


            </Card>

            <Space wrap>
                <Button onClick={() => showDrawer()}>New Proposal</Button>
                <Button onClick={() => showDrawerDetail()}>Details</Button>
            </Space>

            <Drawer title="New Proposal" size="large" placement="right" onClose={onClose} open={open}>
                <NewProposal />
            </Drawer>
            <Drawer title="Proposal Detail" size="large" placement="right" onClose={onCloseDetail} open={openDetail}>
                <Details />
            </Drawer>
        </>
    )
}