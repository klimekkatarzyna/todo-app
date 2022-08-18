import { FC, useCallback } from 'react';
import { SortTaskType } from '../../enums';
import { Menu, Item, Submenu, useContextMenu } from 'react-contexify';
import { ArrowDown, ArrowUp } from 'react-feather';
import { KeyType, useTasks } from '../../hooks/useTasks';

const MENU_ID = 'sotring';

export const SortComponent: FC = () => {
	const { requestSort } = useTasks();

	const { show } = useContextMenu({
		id: MENU_ID,
	});

	const handleContextMenu = useCallback(event => {
		event.preventDefault();
		show(event);
	}, []);

	return (
		<button className='ml-2 p-2 hover:bg-lightGrey absolute right-0 top-10 md:top-2 md:right-5'>
			<button onClick={handleContextMenu}>
				<div className='flex'>
					<ArrowUp className='icon-style text-grey' />
					<ArrowDown className='icon-style text-grey' />
				</div>
				Sortuj
			</button>
			<Menu id={MENU_ID}>
				<Submenu label='sortuj według'>
					{Object?.entries(SortTaskType)?.map(([key, value]) => {
						const sortType =
							(key === 'createdAt' && 'date') ||
							(key === 'deadline' && 'date') ||
							(key === 'title' && 'string') ||
							(key === 'importance' && 'string');
						return (
							<Item key={key} data={{ elementId: key }} onClick={() => requestSort(key as SortTaskType, sortType as KeyType)}>
								{value}
							</Item>
						);
					})}
				</Submenu>
			</Menu>
		</button>
	);
};
