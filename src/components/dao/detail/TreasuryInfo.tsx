import { Button, Card, Col, Divider, Row, Statistic, Table } from "antd"
import { useEffect } from "react";
import { useAppSelector } from "src/controller/hooks";
import { getContributorFund, getMemberFund } from "src/core";
import { AE_AMOUNT_FORMATS, formatAmount } from "@aeternity/aepp-sdk";
import { CopyOutlined } from "@ant-design/icons";

export const TreasuryInfo = () => {

  const { contributor_fund, member_fund, currentDaoAddress, simpleData } = useAppSelector(state => state.daoDetail);

  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => (
        <Button icon={<CopyOutlined />}>{record.address}</Button>
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
    <Card title="All Funds" size="default">
      <Row gutter={6}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Members"
              value={Object.keys(member_fund).length}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Contributors"
              value={Object.keys(contributor_fund).length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Others"
              value={0}
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