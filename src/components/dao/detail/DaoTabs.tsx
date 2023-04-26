import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

export const DaoTabs = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Proposals`,
            children: `Content of Tab Pane 1`,
        },
        {
            key: '2',
            label: `Sub Daos`,
            children: `Content of Tab Pane 2`,
        },
        {
            key: '3',
            label: `Treasury Details`,
            children: `Content of Tab Pane 3`,
        },
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} onChange={() => { }} />
    )
}