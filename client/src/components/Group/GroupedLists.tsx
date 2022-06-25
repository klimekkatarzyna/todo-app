import { IGroup } from '@kkrawczyk/todo-common';
import { FC } from 'react';
import { GroupedList } from './GroupedList';

export const GroupedLists: FC<{ group: IGroup }> = ({ group }) => {
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
