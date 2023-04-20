import { Button, Space } from "antd"

export const Filter = () => {
    return (
        <Space wrap size={"large"}>
            <Button type="primary">All</Button>
            <Button>Parent DAOs</Button>
            <Button type="dashed">Sub DAOs</Button>
        </Space>

    )
}