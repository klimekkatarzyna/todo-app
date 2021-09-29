import React, { FC } from "react";
import styled from 'styled-components';
import { MenuListItem } from "../MenuListItem/MenuListItem";
import { IListItem, IListItemType } from '../../interfaces';
import { Sun } from '@styled-icons/feather/Sun';
import { Star } from '@styled-icons/feather/Star';
import { Calendar } from '@styled-icons/feather/Calendar';
import { User } from '@styled-icons/feather/User';
import { COLOURS } from "../../constants";
import { Border } from "../../common/Border";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

`;

interface IMainList {

}

export const MainList: FC<IMainList> = () => {
    const mainList: IListItem[] = [{
        type: IListItemType.MY_DAY,
        name: 'Mój dzien',
        tasksNumber: undefined,
        icon: <Sun />,
        color: COLOURS.yellow
    }, {
        type: IListItemType.IMPORTANT,
        name: 'Wazne',
        tasksNumber: undefined,
        icon: <Star />,
        color: COLOURS.orange
    },  {
        type: IListItemType.PLANED,
        name: 'Zaplanowane',
        tasksNumber: undefined,
        icon: <Calendar />,
        color: COLOURS.green
    },  {
        type: IListItemType.ASSIGNED,
        name: 'Przydzielone dla Ciebie',
        tasksNumber: undefined,
        icon: <User />,
        color: COLOURS.green
    },  {
        type: IListItemType.TASKS,
        name: 'Zadania',
        tasksNumber: undefined,
        icon: <User />,
        color: COLOURS.red
    }];

    return (
        <Wrapper>
            {mainList.map((listItem: IListItem) => (
                <MenuListItem name={listItem.name} icon={listItem.icon} tasksNumber={listItem.tasksNumber} colorType={listItem.color} />
            ))}
            <Border />
        </Wrapper>
    )
}