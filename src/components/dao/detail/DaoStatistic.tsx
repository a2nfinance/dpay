import { Button, Col, Divider, Drawer, Input, Popover, Row, Space, Statistic } from 'antd';
import { AE_AMOUNT_FORMATS, formatAmount } from "@aeternity/aepp-sdk";
import { useCallback, useState } from 'react';
import { NewProposal } from 'src/components/proposal/NewProposal';
import { fundDao, addMember as addMemberAction } from 'src/core';
import { NewSubDao } from '../NewSubDao';
import { useAppSelector } from 'src/controller/hooks';

export const DaoStatistic = () => {
  const { simpleData } = useAppSelector(state => state.daoDetail);
  const {addFund, addMember} = useAppSelector(state => state.process);

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

  return (
    <Row gutter={6}>
      <Col span={4}>
        <Statistic title="Members" value={simpleData.members_length}  />
      </Col>
      <Col span={4}>
        <Statistic title="Proposals" value={simpleData.proposals_length} precision={2}/>
      </Col>
      <Col span={4}>
        <Statistic title="Treasury (AE)" value={formatAmount(simpleData.balance, { targetDenomination: AE_AMOUNT_FORMATS.AE })} precision={2}  />
      </Col>
      <Col span={4}>
        <p>Status</p>
        <p>{simpleData.status == 1 ? "Active" : "Inactive"}</p>
      </Col>
      <Col span={8}>
        <p>Actions</p>
        <Space direction="horizontal">
          <Button onClick={showDrawerSubDao} type="primary" ghost>New SubDao</Button>
          <Button onClick={showDrawer} type="primary" ghost>New Proposal</Button>
          <Popover
            content={
              <>
                <Input name='adress' value={newMember} onChange={(e) => setNewMember(e.target.value)}/>
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