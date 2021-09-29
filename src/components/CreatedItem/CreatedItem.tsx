import React from 'react';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from '../../constants';
import Checkbox from '../Checkbox/Checkbox';
import { Star } from '@styled-icons/feather/Star';

const CreatedItemWrapper = styled.div`
    display: flex;
    border-bottom: 0.1rem solid ${COLOURS.grey};
`;

const TaskName = styled.div`
    margin: 0 1rem;
`;

const ListName = styled.div`
    display: flex;
`;

const CreatedItem = () => {
    return (
        <CreatedItemWrapper>
            <Checkbox round={true} color={'blue'} disabled={false} name={'asdf'} checked={true} />
            <TaskName>{'task name'}</TaskName>
            <ListName>{'name of list group'}</ListName>
            <IconWrapper color={COLOURS.fontColor}><Star /></IconWrapper>
        </CreatedItemWrapper>
    );
};

export default CreatedItem;