import { Dropdown, Button, MenuProps } from "antd";
import { useAppSelector } from "src/controller/hooks";
import { connect, disconnect, transfer } from "src/core/wallet";
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
        },
        {
            key: '3',
            label: "test transfer",
            onClick: () => transfer()
        }
    ];
    return (
        !!address ? <Dropdown menu={{ items }} placement="bottomLeft" arrow>
             <Button type="primary">{getShortAddress(address)}</Button>
        </Dropdown> : <Button type="primary" onClick={() => connect()}>Connect Wallet</Button>
    
    )
}