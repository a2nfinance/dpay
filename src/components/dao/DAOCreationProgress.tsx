import { Card, Steps } from 'antd';
import { useCallback } from 'react';
import { setDaoFormProps } from 'src/controller/dao/daoFormSlice';
import { useAppDispatch, useAppSelector } from 'src/controller/hooks';
export const DAOCreationProgress = () => {
    const {step} = useAppSelector(state => state.daoForm)
    const dispatch = useAppDispatch();
    const handleChangeStep = useCallback(() => {
        if (step > 0) {
            dispatch(setDaoFormProps({att: "step", value: step - 1 }))
        }
        
    }, [step])
    return (
        <Card title="DAO Creation Process" style={{backgroundColor: "#f5f5f5"}} headStyle={{backgroundColor: "#d93737", color: "white"}}>
            <Steps
                direction="vertical"
                current={step}
                onChange={() => handleChangeStep()}
                items={[
                    {
                        title: 'Pick a DAO type and name it',
                    },
                    {
                        title: 'Governance configuration',
                    },
                    {
                        title: "Voting configuration",
                        
                    },
                    {
                        title: 'Review and approve',
                        
                    },
                ]}
            />
        </Card>

    )
}