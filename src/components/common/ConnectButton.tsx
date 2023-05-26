import { CopyOutlined, DisconnectOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import Image from "next/image";
import { useAppSelector } from "src/controller/hooks";
import { connect, disconnect } from "src/core";
import { useAddress } from "src/hooks/useAddress";
export const ConnectButton = () => {
    const {getShortAddress} = useAddress()
    const { address } = useAppSelector(state => state.wallet)
    const {connectWallet} = useAppSelector(state => state.process)

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    Copy address 
                </a>
            ),
            icon: <CopyOutlined />,
            onClick: () => navigator.clipboard.writeText(address)
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    Disconnect
                </a>
            ),
            icon: <DisconnectOutlined />,
            onClick: () => disconnect() 
        }
    ];
    return (
        !!address ? <Dropdown menu={{ items }} placement="bottomLeft" arrow>
             <Button icon={<Image alt="ae" width={30} height={30} src={"/aeternity-ae-logo.png"} style={{paddingRight: "5px"}} />} type="primary" size="large">{getShortAddress(address)}</Button>
        </Dropdown> : <Button type="primary" loading={connectWallet.processing} size="large" onClick={() => connect()}>Connect Wallet</Button>
    
    )
}