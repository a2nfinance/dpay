import { Steps, Card } from 'antd';
export const DAOCreationProgress = () => {
    return (
        <Card title="DAO Creation Process">
            <Steps
                direction="vertical"
                current={1}
                items={[
                    {
                        title: 'Pick a DAO type and name it',
                    },
                    {
                        title: 'Governance configuration',
                    },
                    {
                        title: "Voting configuration"
                    },
                    {
                        title: 'Review and approve',
                    },
                ]}
            />
        </Card>

    )
}