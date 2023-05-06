import React, { useState } from 'react';
import type { SelectProps } from 'antd';
import { Select, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/controller/hooks';
import { useAddress } from 'src/hooks/useAddress';
import { convertStepForm } from 'src/controller/dao/subDaoFormSlice';

interface ItemProps {
    label: string;
    value: string;
}

export const MultiSelectMember = () => {
    const dispatch = useAppDispatch();
    const {members} = useAppSelector(state => state.daoDetail);
    const [value, setValue] = useState([]);

    const selectProps: SelectProps = {
        mode: 'multiple',
        style: { width: '100%' },
        value,
        options: members.map((m, index) => {
            return {
                label: m,
                value: m
            }
        }),
        onChange: (newValue: string[]) => {
            setValue(newValue);
            dispatch(convertStepForm({members: newValue}))
        },
        placeholder: 'Select Member...',
        maxTagCount: 'responsive',
    };

    return (
       
        <Select {...selectProps} />
       
    );
}