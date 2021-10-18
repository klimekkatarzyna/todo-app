import { FC } from "react";
import styled from 'styled-components';
import { MenuListItem } from "../MenuListItem/MenuListItem";
import { IListItem } from '../../interfaces';
import { mainListData } from "../../constants";
import { useQuery } from "react-query";
import useMainList from "./useMainList";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

interface IMainList {

}

export const MainList: FC<IMainList> = () => {
    // TODO: renurns from API
    // TODO: endpomt to update tasksNumber

    // const { createMainList, getMainList } = useMainList();
    // const { data } = useQuery('createMainList', createMainList);
    // console.log(data);
    
    return (
        <Wrapper>
            {mainListData.map((listItem) => (
                <MenuListItem listItem={listItem} />
            ))}
        </Wrapper>
    )
}