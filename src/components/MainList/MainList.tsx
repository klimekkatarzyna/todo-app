import { FC } from "react";
import styled from 'styled-components';
import { MenuListItem } from "../MenuListItem/MenuListItem";
import { IListItem, IListItemType } from '../../interfaces';
import { Sun } from '@styled-icons/feather/Sun';
import { Star } from '@styled-icons/feather/Star';
import { Calendar } from '@styled-icons/feather/Calendar';
import { User } from '@styled-icons/feather/User';
import { Home } from '@styled-icons/feather/Home';
import { Border } from "../../common/Border";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

`;

interface IMainList {

}

export const MainList: FC<IMainList> = () => {
    // TODO: renurns from API
    // TODO: endpomt to update tasksNumber
    const mainList: IListItem[] = [{
        type: IListItemType.MY_DAY,
        title: 'Mój dzien',
        tasksNumber: undefined,
        icon: <Sun />,
        themeColor: 'grey',
        url: '/'
    }, {
        type: IListItemType.IMPORTANT,
        title: 'Wazne',
        tasksNumber: undefined,
        icon: <Star />,
        themeColor: 'grey',
        url: '/important'
    },  {
        type: IListItemType.PLANED,
        title: 'Zaplanowane',
        tasksNumber: undefined,
        icon: <Calendar />,
        themeColor: 'grey',
        url: '/planned'
    },  {
        type: IListItemType.ASSIGNED,
        title: 'Przydzielone dla Ciebie',
        tasksNumber: undefined,
        icon: <User />,
        themeColor: 'green',
        url: '/assigned_to_me'
    },  {
        type: IListItemType.TASKS,
        title: 'Zadania',
        tasksNumber: undefined,
        icon: <Home />,
        themeColor: 'red',
        url: '/inbox'
    }];

    return (
        <Wrapper>
            {mainList.map((listItem: IListItem) => (
                <MenuListItem listItem={listItem} />
            ))}
            <Border />
        </Wrapper>
    )
}