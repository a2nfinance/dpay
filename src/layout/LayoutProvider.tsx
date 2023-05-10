import {
    CodeOutlined,
    GithubOutlined,
    HomeOutlined,
    PlusOutlined,
    TwitterOutlined
} from '@ant-design/icons';
import React, { useState } from "react";

import { Form, Input, Layout, Menu, Space, theme } from 'antd';

import Image from "next/image";
import { useRouter } from "next/router";
import { ConnectButton } from "src/components/common/ConnectButton";
const { Header, Sider, Content, Footer } = Layout;

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const LayoutProvider = (props: Props) => {
    const [bottom, setBottom] = useState(10);
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onSearch = (value: string) => console.log(value);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider onCollapse={() => setCollapsed(!collapsed)} collapsible collapsed={collapsed}>
                <div style={{ height: 50, margin: 16 }}>
                    {
                        !collapsed ? <Image src={"/logo.png"} alt="dpay" width={160} height={50} /> : <Image src={"/d.png"} alt="dpay" width={50} height={50} />
                    }
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{fontSize: "15px", fontWeight: "500"}}
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
                            icon: <PlusOutlined />,
                            label: 'New Dao',
                            onClick: () => router.push("/dao/new")
                        },
                        { type: 'divider' }
                    ]}
                />


                <Menu
                    style={{position: "absolute", width: "-webkit-fill-available", bottom: "50px", fontSize: "14px", fontWeight: "500"}}
                    theme="dark"
                    mode="inline"
                    items={[
                        {
                            key: '3',
                            label: 'DPAY v1.0.0-Beta',
                        },
                        {
                            key: '4',
                            //@ts-ignore
                            icon: <CodeOutlined />,
                            label: 'Documentation',
                            onClick: () => router.push("/dao/new")
                        },
                        {
                            key: '5',
                            //@ts-ignore
                            icon: <GithubOutlined />,
                            label: 'Github',
                            onClick: () => router.push("/dao/new")
                        },
                        {
                            key: '6',
                            //@ts-ignore
                            icon: <TwitterOutlined />,
                            label: 'Twitter',
                            onClick: () => router.push("/dao/new")
                        },
                        // {
                        //     key: '7',
                        //     //@ts-ignore
                        //     icon: <DiscordIcon color="white" />,
                        //     label: 'Discord',
                        //     onClick: () => router.push("/dao/new")
                        // },

                    ]}
                />

            </Sider>
            <Layout>

                <Header //@ts-ignore
                    style={{ padding: 0, background: colorBgContainer }}>
                    <Space align="center" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}></div>
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

                            {/* <Form.Item>
                                <Switch checkedChildren={<Image src={"/light.svg"} width={16} height={16} alt="Light"/>}
                                 
                                    unCheckedChildren={<Image src={"/dark.svg"} width={16} height={16} alt="Dark"/>}
                                    defaultChecked />
                            </Form.Item> */}
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
                        background: colorBgContainer
                    }}
                >
                    {props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>DPAY ©2023 Created by A2N Finance</Footer>
            </Layout>
        </Layout>
    )

}
