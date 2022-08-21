import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { changeTaskStatusAction } from '../../actions/tasks';

const useTasksStatus = () => {
	const { mutateAsync: changeTaskStatusMutation } = useMutation(changeTaskStatusAction, {
		onSuccess: () => {
			toast.success('Status zadania zmieniony');
		},
	});

	return {
		changeTaskStatusMutation,
	};
};

export default useTasksStatus;
