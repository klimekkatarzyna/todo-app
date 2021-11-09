import { FC } from "react";
import styled from 'styled-components';
import { MenuListItem } from "../MenuListItem/MenuListItem";
import { IListItem } from '../../interfaces';
import useMainList from "./useMainList";
import Loader from "../Loader/Loader";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

interface IMainList {

}

export const MainList: FC<IMainList> = () => {
    // TODO: endpomt to update tasksNumber
    const { mainList, mainListLoading } = useMainList();

    return (
        <Wrapper>
            {mainListLoading ? (
                <Loader />
            ) : (
                mainList?.body.mainLists?.map((listItem: IListItem) => (
                    <MenuListItem listItem={listItem} />
            )))}
        </Wrapper>
    )
}