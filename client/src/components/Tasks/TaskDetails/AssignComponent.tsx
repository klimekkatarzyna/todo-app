import { FC, useCallback, useContext, useState } from 'react';
import { Loader } from 'react-feather';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryKey } from '../../../enums';
import { getListByIdAction } from '../../../actions/lists';
import { IList, ITask } from '@kkrawczyk/todo-common';
import { Modal } from '../../Modal/Modal';
import { DisplayMember } from '../../SharingOptions/DisplayMember';
import { AuthContext, AuthContextType } from '../../../AuthProvider';
import toast from 'react-hot-toast';
import { assignUserToTaskAction } from '../../../actions/tasks';
import { RemoveAssignment } from './RemoveAssignment';
import { AssignUser } from './AssignUser';
import { IQueryError } from '../../../interfaces/app';

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
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const { authData } = useContext<AuthContextType>(AuthContext);

	const { mutate, isLoading: assignLoading } = useMutation(assignUserToTaskAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.tasksOfCurrentList]);
			query.invalidateQueries([QueryKey.getTask]);
			query.invalidateQueries([QueryKey.getAssignedTasks]);
			query.invalidateQueries([QueryKey.tasksList]);
			query.invalidateQueries([QueryKey.getMyDayTasks]);
			query.invalidateQueries([QueryKey.getImportanceTasks]);
			toast.success('Zadanie przypisane');
			setIsModalVisible(false);
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	const onHide = useCallback(() => {
		setIsModalVisible(false);
	}, [setIsModalVisible]);

	return (
		<>
			{isLoading && <Loader />}
			{!!data?.members?.length && !taskData?.assigned && <AssignUser onHandleAction={() => setIsModalVisible(true)} />}
			{taskData?.assigned && <RemoveAssignment taskData={taskData} />}

			{isModalVisible && (
				<Modal title='Przydziel do' onHandleAction={() => setIsModalVisible(false)} isActionButtonHidden onHide={onHide}>
					<h3 className='text-darkerGrey text-sm mb-4'>Członkowie listy</h3>
					{assignLoading && <Loader />}
					<button className='flex items-center w-full' onClick={() => mutate({ _id: taskId, assigned: authData?._id })}>
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
