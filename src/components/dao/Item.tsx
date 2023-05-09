import { CopyOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Space } from 'antd';
import { useRouter } from 'next/router';
import { useAppSelector } from 'src/controller/hooks';
import { joinDao } from 'src/core';
import { daoTypeMap } from 'src/core/constant';
import { useAddress } from 'src/hooks/useAddress';


export const Item = (dao) => {
  const router = useRouter();
  const { nomalizeContractAddress, getShortAddress } = useAddress();
  const {join} = useAppSelector(state => state.process)

  const daoObj = dao.dao[1];

  return (
    <Card title={daoObj.title} style={{marginTop: "5px", backgroundColor: "#f5f5f5"}} headStyle={{backgroundColor: "#d93737", color: "white"}}>

      <Descriptions layout={"vertical"} column={{ xs: 1, xl: 2}}>
        <Descriptions.Item label={"Description"}>{daoObj.description}</Descriptions.Item>
        <Descriptions.Item label={"Address"}>
        <Space wrap>
          <Button icon={<LinkOutlined />} onClick={() => window.open(`https://explorer.aeternity.io/contracts/transactions/${nomalizeContractAddress(dao.dao[0])}`, "_blank")}>{nomalizeContractAddress(getShortAddress(dao.dao[0]))}</Button>
          <Button icon={<CopyOutlined />} onClick={() => navigator.clipboard.writeText(dao.dao[0])}></Button>
        </Space>
        </Descriptions.Item>
        <Descriptions.Item label={"Created Date"}>{new Date(parseInt(daoObj.created_date)).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label={"Type"}>{daoTypeMap[daoObj.dao_type]}</Descriptions.Item>
        <Descriptions.Item label={"Open"}>{daoObj.open ? "Yes (Open to all)" : "No (Invited members only)"}</Descriptions.Item>
      </Descriptions>
      <Space wrap>
        <Button type='primary' onClick={() => router.push(`/dao/address/${nomalizeContractAddress(dao.dao[0])}`)}>View Detail</Button>
        {
          daoObj.open && <Button type='primary' loading={join.processing} onClick={() => joinDao(nomalizeContractAddress(dao.dao[0]))} ghost>Join</Button>
        }
      </Space>
    </Card>
  );
}