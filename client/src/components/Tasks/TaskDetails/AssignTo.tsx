import { FC, useCallback, useContext } from 'react';
import { UserPlus, Loader } from 'react-feather';
import { useQuery } from 'react-query';
import { QueryKey } from '../../../enums';
import { getListByIdAction } from '../../../actions/lists';
import { IList } from '@kkrawczyk/todo-common';
import { Modal } from '../../Modal/Modal';
import { useRecoilState } from 'recoil';
import { modalVisibilityState } from '../../../atoms/modal';
import { DisplayMember } from '../../SharingOptions/DisplayMember';
import { AuthContext, AuthContextType } from '../../../AuthProvider';

interface IAssignToProps {
	listId: string;
}

export const AssignTo: FC<IAssignToProps> = ({ listId }) => {
	const { data, isLoading } = useQuery<IList | undefined>([QueryKey.getListById, listId], () => getListByIdAction({ _id: listId }));
	const [isVisible, setIsVisible] = useRecoilState(modalVisibilityState);
	const { authData } = useContext<AuthContextType>(AuthContext);

	const onShow = useCallback(() => {
		setIsVisible(true);
	}, [isVisible]);

	return (
		<>
			{isLoading && <Loader />}
			{!!data?.members?.length && (
				<button className='task-details-style mb-3' onClick={onShow}>
					<div className='task-details-button-style'>
						<UserPlus className='mr-2 icon-style' />
						{'Przydziel do'}
					</div>
				</button>
			)}

			{isVisible && (
				<Modal title='Przydziel do' onHandleAction={() => {}}>
					<h3 className='text-darkerGrey text-sm mb-4'>Członkowie listy</h3>
					<div className='flex items-center'>
						<DisplayMember member={authData?._id} />
						<span className='text-darkerGrey ml-auto text-xs absolute right-5'>{'przydziel do mnie'}</span>
					</div>
					{data?.members?.map(member => (
						<DisplayMember member={member} />
					))}
				</Modal>
			)}
		</>
	);
};
