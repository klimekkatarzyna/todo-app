import { FC } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { IListItem, IListResponse } from '../../interfaces';
import useCreateList from '../CreateList/useCreateList';
import { MenuListItem } from '../MenuListItem/MenuListItem';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
`;

const Lists: FC = () => {
    const { getLists } = useCreateList();
    const { isLoading, data } = useQuery<IListResponse>('lists', getLists); // TODO: cache it

    return (
        <Wrapper>
            {isLoading && <span>{'loading...'}</span>}
            {data?.body?.lists?.map((item: IListItem) => (
                <MenuListItem listItem={item} />
            ))}
        </Wrapper>
    );
};

export default Lists;