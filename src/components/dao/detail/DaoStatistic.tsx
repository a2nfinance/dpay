import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
const formatter = (value: number) => <CountUp end={value} separator="," />;
export const DaoStatistic = () => {
    return (
        <Row gutter={16}>
        <Col span={6}>
          <Statistic title="Members" value={100} formatter={formatter} />
        </Col>
        <Col span={6}>
          <Statistic title="Proposals" value={50} precision={2} formatter={formatter} />
        </Col>
        <Col span={6}>
          <Statistic title="Treasury" value={1200} precision={2} formatter={formatter} />
        </Col>
        <Col span={6}>
          <Statistic title="SubDaos" value={3} precision={2} formatter={formatter} />
        </Col>
      </Row>
    )
}