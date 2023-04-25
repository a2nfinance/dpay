import React, { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Button, theme, Input, Space } from 'antd';

import { useRouter } from "next/router";
import { useAppSelector } from "src/controller/hooks";
import { ConnectButton } from "src/components/common/ConnectButton";

const { Header, Sider, Content } = Layout;

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const LayoutProvider = (props: Props) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onSearch = (value: string) => console.log(value);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            //@ts-ignore
                            icon: <UserOutlined />,
                            label: 'Home',
                            onClick: () => router.push("/")
                        },
                        {
                            key: '2',
                            //@ts-ignore
                            icon: <VideoCameraOutlined />,
                            label: 'New Dao',
                            onClick: () => router.push("/dao/new")
                        },
                        {
                            key: '3',
                            //@ts-ignore
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout>

                <Header //@ts-ignore
                    style={{ padding: 0, background: colorBgContainer }}>
                    <Space align="center">
                        <Button
                            type="text"
                            icon={collapsed ?
                                //@ts-ignore
                                <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Input.Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                        />

                        <ConnectButton />
                    </Space>
                </Header>
                <Content
                    //@ts-ignore
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )

}
