import { Button, Col, Divider, Drawer, Input, Popover, Row, Space, Statistic } from 'antd';
import { useState } from 'react';
import CountUp from 'react-countup';
import { NewProposal } from 'src/components/proposal/NewProposal';
import { fundDao } from 'src/core';
import { NewSubDao } from '../NewSubDao';
const formatter = (value: number) => <CountUp end={value} separator="," />;
export const DaoStatistic = () => {
  const [openFundPopup, setOpenFundPopup] = useState(false);
  const [openAddMemberPopup, setOpenAddMemberPopup] = useState(false);
  const hideOpenFundPopup = () => {
    setOpenFundPopup(false);
  };

  const handleOpenFundPopupChange = (newOpen: boolean) => {
    setOpenFundPopup(newOpen);
  };
  const hideOpenAddMemberPopup = () => {
    setOpenAddMemberPopup(false);
  };

  const handleOpenAddMemberPopupChange = (newOpen: boolean) => {
    setOpenAddMemberPopup(newOpen);
  };



  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  const [openSubDao, setOpenSubDao] = useState(false);

  const showDrawerSubDao = () => {
    setOpenSubDao(true);
  };

  const onCloseSubDao = () => {
    setOpenSubDao(false);
  };
  const fund = () => {
    fundDao(1);
  }
  return (
    <Row gutter={6}>
      <Col span={4}>
        <Statistic title="Members" value={100} formatter={formatter} />
      </Col>
      <Col span={4}>
        <Statistic title="Proposals" value={50} precision={2} formatter={formatter} />
      </Col>
      <Col span={4}>
        <Statistic title="Treasury" value={1200} precision={2} formatter={formatter} />
      </Col>
      <Col span={4}>
        <Statistic title="SubDaos" value={3} precision={2} formatter={formatter} />
      </Col>
      <Col span={8}>
        <p>Actions</p>
        <Space direction="horizontal">
          <Button onClick={showDrawerSubDao} type="primary" ghost>New SubDao</Button>
          <Button onClick={showDrawer} type="primary" ghost>New Proposal</Button>
          <Popover
            content={
              <>
                <Input name='adress'/>
                <Divider />
                <Button type='primary'>Add</Button>
              </>
            }
            title="Address"
            trigger="click"
            open={openAddMemberPopup}
            onOpenChange={handleOpenAddMemberPopupChange}
          >

            <Button type="primary" ghost>Add Member</Button>
          </Popover>

          <Popover
            content={
              <>
                <Input name='amount' type='number' />
                <Divider />
                <Button type='primary'>Send</Button>
              </>
            }
            title="Amount"
            trigger="click"
            open={openFundPopup}
            onOpenChange={handleOpenFundPopupChange}
          >
            <Button type="primary">Send Fund</Button>
          </Popover>
        </Space>

      </Col>
      <Drawer title="New Proposal" size="large" placement="right" onClose={onClose} open={open}>
        <NewProposal />
      </Drawer>
      <Drawer title="New SubDao" size="large" placement="right" onClose={onCloseSubDao} open={openSubDao}>
        <NewSubDao />
      </Drawer>
    </Row>
  )
}