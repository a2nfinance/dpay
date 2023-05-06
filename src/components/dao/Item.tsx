import { LinkOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Space } from 'antd';
import { useRouter } from 'next/router';
import { daoTypeMap } from 'src/core/constant';
import { useAddress } from 'src/hooks/useAddress';


export const Item = (dao) => {
  const router = useRouter();
  const { nomalizeContractAddress, getShortAddress } = useAddress();

  const daoObj = dao.dao[1];

  return (
    <Card title={daoObj.title}>

      <Descriptions layout={"vertical"} column={{ xs: 1, xl: 2}}>
        <Descriptions.Item label={"Description"}>{daoObj.description}</Descriptions.Item>
        <Descriptions.Item label={"Address"}>
          <Button icon={<LinkOutlined />} onClick={() => window.open(`https://explorer.aeternity.io/contracts/transactions/${nomalizeContractAddress(dao.dao[0])}`, "_blank")}>{nomalizeContractAddress(getShortAddress(dao.dao[0]))}</Button>
        </Descriptions.Item>
        <Descriptions.Item label={"Created Date"}>{new Date(parseInt(daoObj.created_date)).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label={"Type"}>{daoTypeMap[daoObj.dao_type]}</Descriptions.Item>
        <Descriptions.Item label={"Open"}>{daoObj.open ? "Yes (Anyone can Join)" : "No (Invited members only)"}</Descriptions.Item>
      </Descriptions>
      <Space wrap>
        <Button type='primary' onClick={() => router.push(`dao/address/${nomalizeContractAddress(dao.dao[0])}`)}>View Detail</Button>
        <Button type='primary' ghost>Join</Button>
      </Space>
    </Card>
  );
}