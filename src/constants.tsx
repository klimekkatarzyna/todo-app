import React from "react";
import styled, { css } from "styled-components";
import { Plus } from '@styled-icons/feather/Plus';
import { CheckCircle } from '@styled-icons/feather/CheckCircle';
import { Copy } from '@styled-icons/feather/Copy';
import { FileMinus } from '@styled-icons/feather/FileMinus';
import { Trash2 } from '@styled-icons/feather/Trash2';
import { IContextualMenuList, IListItem, IListItemType } from "./interfaces";
import { ContextualMenuOpion } from "./enums";
import { Sun } from '@styled-icons/feather/Sun';
import { Star } from '@styled-icons/feather/Star';
import { Calendar } from '@styled-icons/feather/Calendar';
import { User } from '@styled-icons/feather/User';
import { Home } from '@styled-icons/feather/Home';

export const COLOURS: any = {
    darkGrey: '#383636',
    darkerGrey: '#767678',
    grey: '#505050',
    lightGrey: '#f4f4f4',
    blue: '#0078D7',
    lightBlue: '#f4f6ff',
    white: '#ffffff',
    red: '#c23732',
    green: '#5ca52d',
    border: '#6d6d6d',
    fontColor: '#34373d'
}

interface IIconWrapper {
    color: string;
    children: React.ReactNode;
    isChecked?: boolean;
}

export const IconWrapper = styled.div<IIconWrapper>`
    > svg {
        width: 1.2rem;
        height: 1.2rem;
        color: ${props => props.color ? `${COLOURS[props.color]}` : `${COLOURS.fontColor}`};
        ${props => props.isChecked && css`
            fill: ${props.color};
            stroke: ${props.color};
        `};
    }
`;

export const BackgroundLines = styled.div`
    margin: 0;
    flex: 1;
    background: linear-gradient(180deg, white, white 52px, #e5e5e5 52px, #e5e5e5 52px);
    background-size: 100% 53px;
    box-shadow: inset 0 1px 0 0 #e5e5e5;
    height: 100%;
`;

export const contextualMenuFirstOpion: IContextualMenuList[] = [{
   icon: <Sun />,
   name: "Dodaj do widoku 'Mój dzień'",
   type: ContextualMenuOpion.add_new_task
}, {
    icon: <Star />,
    name: "Oznacz jako wazne",
    type: ContextualMenuOpion.mark_as_done
 }, {
    icon: <CheckCircle />,
    name: "Oznacz jako wykonane",
    type: ContextualMenuOpion.move_task
 }, {
    icon: <Calendar />,
    name: "Termin wykonania: dzisiaj",
    type: ContextualMenuOpion.date_today
 }, {
    icon: <Calendar />,
    name: "Termin wykonania: jutro",
    type: ContextualMenuOpion.date_tomorrow
 }, {
    icon: <Plus />,
    name: "Utwórz nową listę z tego zadania",
    type: ContextualMenuOpion.move_task
 }, {
    icon: <FileMinus />,
    name: "Przenieś zadanie do...",
    type: ContextualMenuOpion.move_task
 }, {
    icon: <Copy />,
    name: "Kopiuj zadanie do...",
    type: ContextualMenuOpion.copy_task
 }, {
    icon: <Trash2 />,
    name: "Usuń zadanie",
    type: ContextualMenuOpion.remove_task
 }];

 export const contextualMenuSecountOpion: IContextualMenuList[] = [{
    icon: <Calendar />,
    name: "Opcje udostępniania",
    type: ContextualMenuOpion.sharing_options
 }, {
    icon: <Plus />,
    name: "Przenieś listę do... >",
    type: ContextualMenuOpion.move_list_to
 }, {
    icon: <FileMinus />,
    name: "Duplikuj listę",
    type: ContextualMenuOpion.duplicate_list
 }, {
    icon: <Copy />,
    name: "Wydrukuj listę",
    type: ContextualMenuOpion.print_list
 }, {
    icon: <Trash2 />,
    name: "Usuń listę",
    type: ContextualMenuOpion.remove_list
 }]

 export const mainListData: IListItem[] = [{
   type: IListItemType.MY_DAY,
   title: 'Mój dzien',
   tasksNumber: undefined,
   icon: <Sun />,
   themeColor: 'grey',
   _id: '/'
}, {
   type: IListItemType.IMPORTANT,
   title: 'Wazne',
   tasksNumber: undefined,
   icon: <Star />,
   themeColor: 'grey',
   _id: '/important'
},  {
   type: IListItemType.PLANED,
   title: 'Zaplanowane',
   tasksNumber: undefined,
   icon: <Calendar />,
   themeColor: 'grey',
   _id: '/planned'
},  {
   type: IListItemType.ASSIGNED,
   title: 'Przydzielone dla Ciebie',
   tasksNumber: undefined,
   icon: <User />,
   themeColor: 'green',
   _id: '/assigned_to_me'
},  {
   type: IListItemType.TASKS,
   title: 'Zadania',
   tasksNumber: undefined,
   icon: <Home />,
   themeColor: 'red',
   _id: '/inbox'
}];