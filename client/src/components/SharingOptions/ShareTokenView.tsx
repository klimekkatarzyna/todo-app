import { FC, useContext } from 'react';
import { ContextualMenuOpion } from '../../enums';
import { IList } from '@kkrawczyk/todo-common';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { Modal } from '../Modal/Modal';
import { Member } from './Member';
import { RemoveMember } from './RemoveMember';
import { ShareLink } from './ShareLink';
interface IShareTokenViewProps {
	onNextStep: () => void;
	listDataResponse: IList;
}

export const ShareTokenView: FC<IShareTokenViewProps> = ({ onNextStep, listDataResponse }) => {
	const { isVisible } = useContext(ModalVisibilityContext);

	return (
		<div>
			<h2 className='text-center'>
				<strong>Udostępnij listę</strong>
			</h2>
			<h3 className='text-darkerGrey text-sm'>Członkowie listy</h3>
			<div className='flex items-center'>
				<div className='flex items-center relative ml-2 text-sm before:contents relative right-[-10px] w-7 h-7 bg-red rounded-full' />{' '}
				{listDataResponse?.owner} <span className='text-darkerGrey ml-auto text-xs'>{'Właściciel'}</span>
			</div>
			{listDataResponse?.members?.map(member => (
				<Member key={member} member={member} listDataResponse={listDataResponse} />
			))}{' '}
			{/*TODO: display name of user or email*/}
			<ShareLink listDataResponse={listDataResponse} />
			<RemoveMember onNextStep={onNextStep} listDataResponse={listDataResponse} />
			{isVisible && <Modal title='Czy chcesz opuścić listę?' onHandleAction={() => {}} contextualType={ContextualMenuOpion.leave_list} />}
		</div>
	);
};
