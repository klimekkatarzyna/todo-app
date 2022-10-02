import { FC } from 'react';
import { ContextMenuOpion } from '../../enums';
import { IList } from '@kkrawczyk/todo-common';
import { Member } from './Member';
import { RemoveMember } from './RemoveMember';
import { ShareLink } from './ShareLink';
import { DisplayMember } from './DisplayMember';
import { ConfirmModal } from '../Modal/ConfirmModal';
import { useModal } from '../../hooks/useModal';
import { useTranslation } from 'react-i18next';

export const ShareTokenView: FC<{ onNextStep: () => void; listDataResponse: IList | undefined }> = ({ onNextStep, listDataResponse }) => {
	const { t } = useTranslation();
	const { modalType } = useModal();

	return (
		<div>
			<h3 className='text-darkerGrey text-sm'>{t('list-members')}</h3>
			<div className='flex items-center'>
				<DisplayMember member={listDataResponse?.userId} />
				<span className='text-darkerGrey ml-auto text-xs absolute right-5'>{t('owner')}</span>
			</div>
			{listDataResponse?.members?.map(member => (
				<Member key={member} member={member} listDataResponse={listDataResponse} />
			))}{' '}
			<ShareLink listDataResponse={listDataResponse} />
			<RemoveMember onNextStep={onNextStep} listDataResponse={listDataResponse} />
			{modalType === ContextMenuOpion.leave_list && <ConfirmModal title={t('leave-list-modal-title')} />}
		</div>
	);
};
