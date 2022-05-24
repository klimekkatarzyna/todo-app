import { FC, useContext } from 'react';
import { Loader } from 'react-feather';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryKey } from '../../../enums';
import { getListByIdAction } from '../../../actions/lists';
import { IList, ITask } from '@kkrawczyk/todo-common';
import { Modal } from '../../Modal/Modal';
import { useRecoilState } from 'recoil';
import { modalVisibilityState } from '../../../atoms/modal';
import { DisplayMember } from '../../SharingOptions/DisplayMember';
import { AuthContext, AuthContextType } from '../../../AuthProvider';
import toast from 'react-hot-toast';
import { assignUserToTaskAction } from '../../../actions/tasks';
import { RemoveAssignment } from './RemoveAssignment';
import { AssignUser } from './AssignUser';

interface IAssignComponentrops {
	listId: string;
	taskId: string;
	taskData: ITask | undefined;
}

export const AssignComponent: FC<IAssignComponentrops> = ({ listId, taskId, taskData }) => {
	const query = useQueryClient();
	const { data, isLoading } = useQuery<IList | undefined>([QueryKey.getListById, listId], () => getListByIdAction({ _id: listId }), {
		enabled: !!listId,
	});
	const [isVisible, setIsVisible] = useRecoilState(modalVisibilityState);
	const { authData } = useContext<AuthContextType>(AuthContext);

	const { mutate, isLoading: assignLoading } = useMutation(assignUserToTaskAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.tasksOfCurrentList]);
			query.invalidateQueries([QueryKey.getTask]);
			query.invalidateQueries([QueryKey.getAssignedTasks]);
			query.invalidateQueries([QueryKey.tasksList]);
			toast.success('Zadanie przypisane');
			setIsVisible(false);
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	return (
		<>
			{isLoading && <Loader />}
			{!!data?.members?.length && !taskData?.assigned && <AssignUser taskData={taskData} />}
			{taskData?.assigned && <RemoveAssignment taskData={taskData} />}

			{isVisible && (
				<Modal title='Przydziel do' onHandleAction={() => setIsVisible(false)} isActionButtonHidden>
					<h3 className='text-darkerGrey text-sm mb-4'>Członkowie listy</h3>
					{assignLoading && <Loader />}
					<button className='flex items-center w-full' onClick={() => authData?._id}>
						<DisplayMember member={authData?._id} />
						<span className='text-darkerGrey ml-auto text-xs absolute right-5'>{'przydziel do mnie'}</span>
					</button>
					{data?.members?.map(member => (
						<button
							className='flex flex-row items-center p-1 hover:bg-hoverColor cursor-pointer w-full'
							onClick={() => mutate({ _id: taskId, assigned: member })}>
							<DisplayMember member={member} />
						</button>
					))}
				</Modal>
			)}
		</>
	);
};
