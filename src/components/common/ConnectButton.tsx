import { Dropdown, Button, MenuProps } from "antd";
import Image from "next/image";
import { useAppSelector } from "src/controller/hooks";
import { connect, disconnect, getDaos, transfer } from "src/core";
import { useAddress } from "src/hooks/useAddress";
export const ConnectButton = () => {
    const {getShortAddress} = useAddress()
    const { address } = useAppSelector(state => state.wallet)

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    Copy address 
                </a>
            ),
            onClick: () => {}
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    Disconnect
                </a>
            ),
            onClick: () => disconnect() 
        }
    ];
    return (
        !!address ? <Dropdown menu={{ items }} placement="bottomLeft" arrow>
             <Button icon={<Image alt="ae" width={30} height={30} src={"/aeternity-ae-logo.png"} style={{paddingRight: "5px"}} />} type="primary" size="large">{getShortAddress(address)}</Button>
        </Dropdown> : <Button type="primary" size="large" onClick={() => connect()}>Connect Wallet</Button>
    
    )
}