import { FC } from 'react';
import { ContextMenuOpion } from '../../enums';
import { IList } from '@kkrawczyk/todo-common';
import { ContextualModal } from '../Modal/ContextualModal';
import { Member } from './Member';
import { RemoveMember } from './RemoveMember';
import { ShareLink } from './ShareLink';
import { DisplayMember } from './DisplayMember';
import { useRecoilValue } from 'recoil';
import { modalVisibilityState } from '../../atoms/modal';
interface IShareTokenViewProps {
	onNextStep: () => void;
	listDataResponse: IList;
}

export const ShareTokenView: FC<IShareTokenViewProps> = ({ onNextStep, listDataResponse }) => {
	const isVisible = useRecoilValue(modalVisibilityState);

	return (
		<div>
			<h2 className='text-center'>
				<strong>Udostępnij listę</strong>
			</h2>
			<h3 className='text-darkerGrey text-sm'>Członkowie listy</h3>
			<div className='flex items-center'>
				<DisplayMember member={listDataResponse?.userId} />
				<span className='text-darkerGrey ml-auto text-xs absolute right-5'>{'Właściciel'}</span>
			</div>
			{listDataResponse?.members?.map(member => (
				<Member key={member} member={member} listDataResponse={listDataResponse} />
			))}{' '}
			<ShareLink listDataResponse={listDataResponse} />
			<RemoveMember onNextStep={onNextStep} listDataResponse={listDataResponse} />
			{isVisible && (
				<ContextualModal title='Czy chcesz opuścić listę?' onHandleAction={() => {}} contextualType={ContextMenuOpion.leave_list} />
			)}
		</div>
	);
};
