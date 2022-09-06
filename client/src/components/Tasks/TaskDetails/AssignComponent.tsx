import { FC, useCallback, useContext } from 'react';
import { Loader } from 'react-feather';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ModalType, QueryKey } from '../../../enums';
import { getListByIdAction } from '../../../actions/lists';
import { IList, ITask } from '@kkrawczyk/todo-common';
import { DisplayMember } from '../../SharingOptions/DisplayMember';
import { AuthContext, AuthContextType } from '../../../AuthProvider';
import toast from 'react-hot-toast';
import { assignUserToTaskAction } from '../../../actions/tasks';
import { RemoveAssignment } from './RemoveAssignment';
import { AssignUser } from './AssignUser';
import { HttpResponse } from '../../../utils/http';
import { RegularModal } from '../../Modal/RegularModal';
import { useModal } from '../../../hooks/useModal';

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
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { modalType, showModal, hideModal } = useModal();

	const taskAssigment = useCallback(
		(tasks: ITask[] | undefined, response: HttpResponse<ITask>) =>
			tasks?.map(task => (task._id === response.body?._id ? { ...task, assigned: response.body?.assigned } : task)),
		[]
	);

	const { mutate, isLoading: assignLoading } = useMutation(assignUserToTaskAction, {
		onSuccess: async response => {
			query.setQueryData<ITask[] | undefined>([QueryKey.getImportanceTasks], (tasks: ITask[] | undefined) => taskAssigment(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, taskData?.parentFolderId], (tasks: ITask[] | undefined) =>
				taskAssigment(tasks, response)
			);
			query.setQueryData<ITask | undefined>([QueryKey.getTask, response.body?._id], (task: ITask | undefined) =>
				task?._id === response.body?._id ? { ...task, assigned: response.body?.assigned } : task
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.getMyDayTasks], (tasks: ITask[] | undefined) => taskAssigment(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getAssignedTasks, authData?._id], (tasks: ITask[] | undefined) =>
				taskAssigment(tasks, response)
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksList], (tasks: ITask[] | undefined) => taskAssigment(tasks, response));

			toast.success('Zadanie przypisane');
			hideModal();
		},
	});

	return (
		<>
			{isLoading && <Loader />}
			{!!data?.members?.length && !taskData?.assigned && <AssignUser onHandleAction={() => showModal({ modal: ModalType.assigment })} />}
			{taskData?.assigned && <RemoveAssignment taskData={taskData} />}

			{modalType === ModalType.assigment && (
				<RegularModal title='Przydziel do'>
					<h3 className='text-darkerGrey text-sm mb-4'>Członkowie listy</h3>
					{assignLoading && <Loader />}
					<button className='flex items-center w-full' onClick={() => mutate({ _id: taskId, assigned: authData?._id })}>
						<DisplayMember member={authData?._id} />
						<span className='text-darkerGrey ml-auto text-xs absolute right-5'>{'przydziel do mnie'}</span>
					</button>
					{data?.members?.map((member, index) => (
						<button
							key={index}
							className='flex flex-row items-center hover:bg-hoverColor cursor-pointer w-full'
							onClick={() => mutate({ _id: taskId, assigned: member })}>
							<DisplayMember member={member} />
						</button>
					))}
				</RegularModal>
			)}
		</>
	);
};
