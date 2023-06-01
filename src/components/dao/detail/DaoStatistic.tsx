import { Button, Col, Divider, Drawer, Dropdown, Input, MenuProps, Popover, Row, Space, Statistic } from 'antd';
import { AE_AMOUNT_FORMATS, formatAmount } from "@aeternity/aepp-sdk";
import { useCallback, useState } from 'react';
import { NewProposal } from 'src/components/proposal/NewProposal';
import { fundDao, addMember as addMemberAction } from 'src/core';
import { NewSubDao } from '../NewSubDao';
import { useAppSelector } from 'src/controller/hooks';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

export const DaoStatistic = () => {
  const { simpleData } = useAppSelector(state => state.daoDetail);
  const { addFund, addMember } = useAppSelector(state => state.process);

  const [fundAmount, setFundAmount] = useState("");
  const [newMember, setNewMember] = useState("");

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

  const fund = useCallback(() => {
    fundDao(parseFloat(fundAmount));
  }, [fundAmount])


  const doAddMember = useCallback(() => {
    addMemberAction(newMember);
  }, [newMember])


  const items: MenuProps['items'] = [
    {
      label: 'Payout',
      key: '1',
      //icon: <UserOutlined />,
    },
    {
      label: 'Vesting',
      key: '2',
      //icon: <UserOutlined />,
    },
    {
      label: 'Governance',
      key: '3',
      // icon: <UserOutlined />,
      danger: true,
    }
  ];

  const menuProps = {
    items,
    onClick: () => { },
  };
  return (
    <Row gutter={8}>
      <Col span={3}>
        <Statistic title="Members" value={simpleData.members_length} />
      </Col>
      <Col span={3}>
        <Statistic title="Proposals" value={simpleData.proposals_length} />
      </Col>
      <Col span={3}>
        <Statistic title="Treasury (AE)" value={formatAmount(simpleData.balance, { targetDenomination: AE_AMOUNT_FORMATS.AE })} precision={3} />
      </Col>
      <Col span={3}>
        <p>Status</p>
        <p>{simpleData.status == 1 ? "Active" : "Inactive"}</p>
      </Col>
      <Col span={12}>
        <p>Actions</p>
        <Space direction="horizontal">
          <Button onClick={showDrawerSubDao} type="primary" ghost>New SubDao</Button>
          {/* <Button onClick={showDrawer} type="primary" ghost>New Proposal</Button> */}
          <Dropdown menu={menuProps}>
            <Button type="primary" ghost>
              <Space>
                New Proposal
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Popover
            content={
              <>
                <Input name='adress' value={newMember} onChange={(e) => setNewMember(e.target.value)} />
                <Divider />
                <Button type='primary' onClick={() => doAddMember()} loading={addMember.processing}>Add</Button>
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

                <Input name='amount' type='number' value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} />
                <Divider />
                <Button type='primary' onClick={() => fund()} loading={addFund.processing}>Send</Button>
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