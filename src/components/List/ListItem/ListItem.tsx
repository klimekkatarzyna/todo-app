import React, { FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../../constants';
import Checkbox from '../../Checkbox/Checkbox';
import ImportanceButton from '../../ImportanceButton/ImportanceButton';

const ListItemWrapper = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 0.1rem solid ${COLOURS.lightGrey};
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: ${COLOURS.lightGrey};
    }
`;

const Names = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 1rem;
    margin-right: auto;
`;

const TaskName = styled.div`
    color: ${COLOURS.fontColor};
`;

const ListName = styled.span`
    display: inline-flex;
    color: ${COLOURS.darkerGrey};
    font-size: 0.8rem;
    margin-right: 1rem;
`;

const TaskItemInfo = styled.span`
    color: ${COLOURS.red};
    font-size: 0.8rem;
`;

interface IListItem {
    taskName: string;
    groupName: string;
    isChecked: boolean;
    taskItemInfo?: string;
}

const ListItem: FC<IListItem> = ({ taskName, groupName, isChecked, taskItemInfo }) => {
    return (
        <ListItemWrapper>
            <Checkbox round={true} color={'blue'} />
            <Names>
                <TaskName>{taskName}</TaskName>
                <div>
                    {groupName && <ListName>{groupName}</ListName>}
                    {taskItemInfo && <TaskItemInfo>{taskItemInfo}</TaskItemInfo>}
                </div>
            </Names>
            <ImportanceButton isChecked={isChecked} />
        </ListItemWrapper>
    );
};

export default ListItem;