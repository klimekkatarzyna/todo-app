import { FC, useContext } from 'react';
import { ContextualMenuOpion, QueryKey } from '../../enums';
import { IList } from '@kkrawczyk/todo-common';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { ContextualModal } from '../Modal/ContextualModal';
import { Member } from './Member';
import { RemoveMember } from './RemoveMember';
import { ShareLink } from './ShareLink';
import { useQuery } from 'react-query';
import { getUserAction } from '../../actions/user';
import { Loader } from 'react-feather';
interface IShareTokenViewProps {
	onNextStep: () => void;
	listDataResponse: IList;
}

export const ShareTokenView: FC<IShareTokenViewProps> = ({ onNextStep, listDataResponse }) => {
	const { isVisible } = useContext(ModalVisibilityContext);
	const { data, isLoading } = useQuery([QueryKey.getUser, listDataResponse?.userId], () => getUserAction(listDataResponse?.userId));

	return (
		<div>
			<h2 className='text-center'>
				<strong>Udostępnij listę</strong>
			</h2>
			<h3 className='text-darkerGrey text-sm'>Członkowie listy</h3>
			<div className='flex items-center'>
				{isLoading && <Loader />}
				<div className='flex items-center relative mr-2 text-sm before:contents w-7 h-7 bg-red rounded-full' /> {data?.username}{' '}
				<span className='text-darkerGrey ml-auto text-xs'>{'Właściciel'}</span>
			</div>
			{listDataResponse?.members?.map(member => (
				<Member key={member} member={member} listDataResponse={listDataResponse} />
			))}{' '}
			<ShareLink listDataResponse={listDataResponse} />
			<RemoveMember onNextStep={onNextStep} listDataResponse={listDataResponse} />
			{isVisible && (
				<ContextualModal title='Czy chcesz opuścić listę?' onHandleAction={() => {}} contextualType={ContextualMenuOpion.leave_list} />
			)}
		</div>
	);
};
