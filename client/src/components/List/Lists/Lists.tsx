import { FC, memo, useCallback, useContext } from 'react';
import { MenuListItem } from '../../MenuListItem/MenuListItem';
import { Loader } from 'react-feather';
import { ContextMenuOpion } from '../../../enums';
import { SharingOptions } from '../../SharingOptions/SharingOptions';
import { IList } from '@kkrawczyk/todo-common';
import { useList } from '../../../hooks/useList';
import { useRecoilValue } from 'recoil';
import { listsState } from '../../../atoms';
import { ContextMenuContext } from '../../../providers/ContextMenuProvider';
import { AuthContext } from '../../../AuthProvider';
import { useSwitchToFirstListItem } from '../../../hooks/useSwitchToFirstListItem';
import { ConfirmModal } from '../../Modal/ConfirmModal';
import { useModal } from '../../../hooks/useModal';
import { RegularModal } from '../../Modal/RegularModal';
import { useTranslation } from 'react-i18next';

const ListsComponents: FC<{ isNavClosed: boolean }> = ({ isNavClosed }) => {
	const { t } = useTranslation();
	const { onHandleSwitchToFirstListItem } = useSwitchToFirstListItem();
	const { modalType } = useModal();
	const { getListsLoading, removeListMutation, leaveListMutation } = useList();
	const list = useRecoilValue(listsState);
	const { contextualMenu } = useContext(ContextMenuContext);
	const { authData } = useContext(AuthContext);

	const removeList = useCallback(async () => {
		if (contextualMenu?.type !== ContextMenuOpion.remove_list) return;
		await removeListMutation({ _id: contextualMenu?.elementId });
		onHandleSwitchToFirstListItem();
	}, [contextualMenu, onHandleSwitchToFirstListItem, removeListMutation]);

	return (
		<>
			<div className='flex flex-col text-base' id='list-items'>
				{getListsLoading && <Loader className='animate-spin m-auto' />}
				{list?.map((list: IList, index: number) => (
					<MenuListItem key={index} listItem={list} isNavClosed={isNavClosed} />
				))}
			</div>

			{modalType === ContextMenuOpion.remove_list && <ConfirmModal title={t('remove-list-modal-title')} onHandleAction={removeList} />}
			{modalType === ContextMenuOpion.sharing_options && (
				<RegularModal title={t('share-list-modal-title')}>
					<SharingOptions />
				</RegularModal>
			)}
			{modalType === ContextMenuOpion.leave_list && (
				<ConfirmModal
					title={t('leave-list-modal-title')}
					onHandleAction={() => leaveListMutation({ _id: contextualMenu?.elementId, member: authData?._id })}
				/>
			)}
		</>
	);
};

export const Lists = memo(ListsComponents);
