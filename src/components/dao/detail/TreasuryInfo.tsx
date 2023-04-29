import { Card, Col, Divider, Row, Statistic, Table } from "antd"

export const TreasuryInfo = () => {

    const dataSource = [
        {
          key: '1',
          address: 'Mike',
          type: "members",
          amount: '10 Downing Street',
        },
        {
          key: '2',
          address: 'Mike',
          type: "contributor",
          amount: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
      ];

    return (
        <Card title="All Funds" size="default">
            <Row gutter={6}>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Members"
                            value={10}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Contributors"
                            value={5}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Others"
                            value={5}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
            </Row>
            <Divider/>
            <Table dataSource={dataSource} columns={columns} />;

        </Card>
    )
}