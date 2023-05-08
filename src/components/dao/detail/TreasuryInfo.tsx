import { Button, Card, Col, Divider, Row, Statistic, Table } from "antd"
import { useEffect } from "react";
import { useAppSelector } from "src/controller/hooks";
import { getContributorFund, getMemberFund } from "src/core";
import { AE_AMOUNT_FORMATS, formatAmount } from "@aeternity/aepp-sdk";
import { CopyOutlined } from "@ant-design/icons";
import { useTreasury } from "src/hooks/useTreasury";

export const TreasuryInfo = () => {

  const { contributor_fund, member_fund, currentDaoAddress, simpleData } = useAppSelector(state => state.daoDetail);
  const {getTotalMemberFund, getTotalContributorFund, getOtherFund} = useTreasury();

  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => (
        <Button icon={<CopyOutlined />} onClick={() => navigator.clipboard.writeText(record.address)}>{record.address}</Button>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Amount (AE)',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];


  useEffect(() => {
    getContributorFund();
    getMemberFund();
  }, [currentDaoAddress])
  return (
    <Card title="Funds" size="default">
      <Row gutter={6}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Members"
              value={getTotalMemberFund(member_fund)}
              valueStyle={{ color: '#3f8600' }}
              precision={3}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Contributors"
              value={getTotalContributorFund(contributor_fund)}
              valueStyle={{ color: '#3f8600' }}
              precision={3}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Others"
              value={getOtherFund(simpleData.balance, member_fund, contributor_fund)}
              precision={3}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Table dataSource={[
        ...(
          Object.keys(contributor_fund).map((c, i) => {
            return {
              key: `c-${i}`,
              address: contributor_fund[c][0],
              type: "contributor",
              amount: formatAmount(contributor_fund[c][1], { targetDenomination: AE_AMOUNT_FORMATS.AE }),
            }
          })
        )
        ,
        ...(
          Object.keys(member_fund).map((c, i) => {
            return {
              key: `m-${i}`,
              address: member_fund[c][0],
              type: "member",
              amount: formatAmount(member_fund[c][1], { targetDenomination: AE_AMOUNT_FORMATS.AE }),
            }
          })
        )
      ]
      } columns={columns} />;

    </Card>
  )
}