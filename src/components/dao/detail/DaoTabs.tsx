import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Proposals } from './Proposals';
import { SubDaos } from './SubDaos';
import { TreasuryInfo } from './TreasuryInfo';

export const DaoTabs = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Proposals`,
            children: <Proposals />,
        },
        {
            key: '2',
            label: `Sub Daos`,
            children: <SubDaos />,
        },
        {
            key: '3',
            label: `Treasury Details`,
            children: <TreasuryInfo />,
        },
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} onChange={() => { }} />
    )
}