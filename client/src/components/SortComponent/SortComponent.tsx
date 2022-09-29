import { FC, useCallback } from 'react';
import { ModalType } from '../../enums';
import { Menu, Item, Submenu, useContextMenu } from 'react-contexify';
import { ArrowDown, ArrowUp, UserPlus } from 'react-feather';
import { useListDetails } from '../../hooks/useListDetails';
import { useSharingData } from '../../hooks/useSharingData';
import { useModal } from '../../hooks/useModal';
import { SharingOptions } from '../SharingOptions/SharingOptions';
import { RegularModal } from '../Modal/RegularModal';
import { SortTaskString, SortTaskType } from '@kkrawczyk/todo-common';

const MENU_ID = 'sotring';

export const SortComponent: FC<{ sortFunction: (data: SortTaskString) => void }> = ({ sortFunction }) => {
	const { data: listDetails } = useListDetails();
	const { isOwner } = useSharingData(listDetails?.userId);
	const { modalType, showModal } = useModal();

	const { show } = useContextMenu({
		id: MENU_ID,
	});

	const handleContextMenu = useCallback(
		event => {
			event.preventDefault();
			show(event);
		},
		[show]
	);

	return (
		<div className='w-full h-full flex print:hidden'>
			<div className='ml-2 p-2 flex items-center hover:bg-lightGrey absolute right-0 top-10 md:top-2'>
				<button onClick={handleContextMenu}>
					<div className='flex'>
						<ArrowUp className='icon-style text-grey' />
						<ArrowDown className='icon-style text-grey' />
					</div>
					Sortuj
				</button>
				{isOwner && (
					<button className='m-2 ml-4' id='share-list-icon' onClick={() => showModal({ modal: ModalType.sharing })}>
						<UserPlus className='icon-style text-grey' />
					</button>
				)}

				<Menu id={MENU_ID}>
					<Submenu label='sortuj według'>
						{Object?.entries(SortTaskType)?.map(([key, value]) => {
							return (
								<Item key={key} data={{ elementId: key }} onClick={() => sortFunction(key as SortTaskString)}>
									{value}
								</Item>
							);
						})}
					</Submenu>
				</Menu>
				{modalType === ModalType.sharing && (
					<RegularModal title='Udostępnij listę'>
						<SharingOptions />
					</RegularModal>
				)}
			</div>
		</div>
	);
};
