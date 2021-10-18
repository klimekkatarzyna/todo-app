import { FC } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { IListItem, IListItemType, IListResponse } from '../../../interfaces';
import useList from '../useList';
import { MenuListItem } from '../../MenuListItem/MenuListItem';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
`;

const Lists: FC = () => {
    const { getLists } = useList();
    const { isLoading, data } = useQuery<IListResponse>('lists', getLists); // TODO: cache it

    return (
        <Wrapper>
            {isLoading && <span>{'loading...'}</span>}
            {data?.body?.lists?.map((item: IListItem) => (
                <MenuListItem listItem={item} type={IListItemType.TASK} />
            ))}
        </Wrapper>
    );
};

export default Lists;