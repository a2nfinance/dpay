import { Button, Col, Drawer, Row, Space, Statistic } from 'antd';
import { useState } from 'react';
import CountUp from 'react-countup';
import { NewProposal } from 'src/components/proposal/NewProposal';
import { fundDao } from 'src/core';
const formatter = (value: number) => <CountUp end={value} separator="," />;
export const DaoStatistic = () => {
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
          <Button onClick={showDrawerSubDao}>New SubDao</Button>
          <Button onClick={showDrawer}>New Proposal</Button>
          <Button onClick={fund}>Fund Dao</Button>
        </Space>

      </Col>
      <Drawer title="New Proposal" size="large" placement="right" onClose={onClose} open={open}>
        <NewProposal />
      </Drawer>
      <Drawer title="New SubDao" size="large" placement="right" onClose={onCloseSubDao} open={openSubDao}>
        <NewProposal />
      </Drawer>
    </Row>
  )
}