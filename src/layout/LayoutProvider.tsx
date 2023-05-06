import React, { useState } from "react";
import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    
} from '@ant-design/icons';

import { Layout, Menu, Button, theme, Input, Space, Affix, Form } from 'antd';

import { useRouter } from "next/router";
import { ConnectButton } from "src/components/common/ConnectButton";
import Image from "next/image";

const { Header, Sider, Content, Footer } = Layout;

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
        <Layout style={{ minHeight: '100vh' }}> 
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div style={{ height: 50, margin: 16}}>
                    <Image src={"/dpay.png"} alt="dpay" width={160} height={50} />
                </div>

                <Menu
                    theme="dark"
                    mode="inline"

                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            //@ts-ignore
                            icon: <HomeOutlined />,
                            label: 'Home',
                            onClick: () => router.push("/")
                        },
                        {
                            key: '2',
                            //@ts-ignore
                            icon: <TeamOutlined />,
                            label: 'New Dao',
                            onClick: () => router.push("/dao/new")
                        },
                        { type: 'divider' }
                        // {
                        //     key: '3',
                        //     //@ts-ignore
                        //     icon: <UploadOutlined />,
                        //     label: 'nav 3',
                        // },
                    ]}
                />

            </Sider>
            <Layout>

                <Header //@ts-ignore
                    style={{ padding: 0, background: colorBgContainer }}>
                    <Space align="center" style={{ display: "flex", justifyContent: "space-between" }}>
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
                        <Form layout="inline">

                            <Form.Item>
                                <Input.Search
                                    placeholder="input search text"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    onSearch={onSearch}
                                />
                            </Form.Item>
                            <Form.Item>
                                <ConnectButton />
                            </Form.Item>
                        </Form>



                    </Space>
                </Header>
                <Content
                    //@ts-ignore
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        boxSizing: "border-box",
                        background: colorBgContainer,
                    }}
                >
                    {props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>DPAY ©2023 Created by A2N Finance</Footer>
            </Layout>
        </Layout>
    )

}
