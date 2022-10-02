import { IGroup } from '@kkrawczyk/todo-common';
import { FC } from 'react';
import { GroupedList } from './GroupedList';
import { useTranslation } from 'react-i18next';

export const GroupedLists: FC<{ group: IGroup }> = ({ group }) => {
	const { t } = useTranslation();
	return (
		<>
			{!!group ? (
				group.lists?.map((list, index) => <GroupedList key={index} listId={list} />)
			) : (
				<div className='pl-2 pt-4 pb-4 text-base md:text-sm'>{t('empty-group')}</div>
			)}
		</>
	);
};
