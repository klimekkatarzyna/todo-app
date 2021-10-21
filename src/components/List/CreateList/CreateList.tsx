import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { InputType } from '../../../enums';
import { Input } from '../../Input/Input';
import useList from '../useList';
import { COLOURS } from '../../../constants';
import { removesWhitespaceFromString } from '../../../utils/utilsFunctions';

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
    const { mutateCreateList } = useList();

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const clearStr = removesWhitespaceFromString(event.target?.value);
        setListName(clearStr);
    }, []);

    const handleResertInput = useCallback(() => {
        setListName('');
    }, []);

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        try {
            await mutateCreateList(listName);
            handleResertInput();
            //TODO: redirect on created list 
        } catch {
            //TODO: handle error & show notificayion
        }
    }, [listName]);

    return (
        <Wrapper>
            <form onSubmit={onSubmit}>
                <Input
                    name='newList'
                    isIcon
                    colorType={InputType.primary}
                    placeholder={'Nowa lista'}
                    value={listName as string}
                    onChange={handleChange} />
            </form>
        </Wrapper>
    );
};

export default CreateList;