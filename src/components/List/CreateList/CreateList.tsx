import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { InputType } from '../../../enums';
import { Input } from '../../Input/Input';
import useList from '../useList';
import { useMutation, useQueryClient } from 'react-query';
import { COLOURS } from '../../../constants';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    transition: width 180ms ease;
    background-color: ${COLOURS.lightGrey};
    width: 210px;
`;

interface ISidebar {

}

const CreateList: FC<ISidebar> = () => {
    const [listName, setListName] = useState<string>('');
    const query = useQueryClient();
    const { createList } = useList();

    const { mutate: mutateCreateList } = useMutation(createList, {
        onSuccess: () => {
            query.invalidateQueries(['lists'])
        }
    });

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setListName(event.target?.value);
    }, []);

    const onSubmit = useCallback(async () => {
        try {
            await mutateCreateList(listName);
        } catch {
            //TODO: handle error & show notificayion
        }
    }, [listName]);

    return (
        <Wrapper>
            <form onSubmit={onSubmit}>
                <Input
                    isIcon
                    type={InputType.primary}
                    placeholder={'Nowa lista'}
                    value={listName as string}
                    onChange={handleChange} />
            </form>
        </Wrapper>
    );
};

export default CreateList;