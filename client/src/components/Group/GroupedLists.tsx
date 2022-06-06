import { IGroup } from '@kkrawczyk/todo-common';
import { FC } from 'react';
import { GroupedList } from './GroupedList';

interface IGroupedListsProps {
	group: IGroup;
}

export const GroupedLists: FC<IGroupedListsProps> = ({ group }) => {
	return (
		<>
			{!!group ? (
				group.lists?.map((list, index) => <GroupedList key={index} listId={list} />)
			) : (
				<div className='pl-2 pt-4 pb-4 text-sm'>Pusta grupa. Dodaj listę</div>
			)}
		</>
	);
};
