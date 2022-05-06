import React, { useContext, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { changeTaskImportanceAction, taskInMyDayAction } from '../../actions/tasks';
import { ContextualModal } from '../Modal/ContextualModal';
import toast from 'react-hot-toast';
import { ContextMenuOpion, QueryKey } from '../../enums';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { useParams } from 'react-router-dom';
import { IUseParams } from '../../interfaces/app';
import { Importance } from '@kkrawczyk/todo-common';
import { useTasks } from '../../hooks/useTasks';

export const TasksContextualMenuActions = () => {
	const { isVisible } = useContext(ModalVisibilityContext);
	const query = useQueryClient();
	const { removeTaskMutation, onMarkTaskAsCompleted, onMarkTaskAsInCompleted } = useTasks();
	const { listId } = useParams<IUseParams>();
	const { contextualMenu } = useContext(ContextMenuContext);

	const { mutate: taskInMyDayMutation } = useMutation(taskInMyDayAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.tasksOfCurrentList]);
			query.invalidateQueries([QueryKey.getTask]);
			toast.success('Zadanie usunięte z widoku "Mój dzień"');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	const { mutate: changeTaskImportanceMutation } = useMutation(changeTaskImportanceAction, {
		onSuccess: () => {
			query.invalidateQueries(QueryKey.getImportanceTasks);
			query.invalidateQueries(QueryKey.tasksOfCurrentList);
			query.invalidateQueries(QueryKey.getTask);
			query.invalidateQueries(QueryKey.getMyDayTasks);
			query.invalidateQueries(QueryKey.getAssignedTasks);
			toast.success('Ważność zadanie zmieniona');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	useEffect(() => {
		switch (contextualMenu?.type) {
			case ContextMenuOpion.add_to_myday:
				taskInMyDayMutation({ _id: contextualMenu.elementId, isMyDay: true });
				break;
			case ContextMenuOpion.remove_from_myday:
				taskInMyDayMutation({ _id: contextualMenu.elementId, isMyDay: false });
				break;
			case ContextMenuOpion.mark_as_important:
				changeTaskImportanceMutation({ _id: contextualMenu.elementId, parentFolderId: listId, importance: Importance.high });
				break;
			case ContextMenuOpion.remove_importance:
				changeTaskImportanceMutation({ _id: contextualMenu.elementId, parentFolderId: listId, importance: Importance.normal });
				break;
			case ContextMenuOpion.mark_as_complete:
				onMarkTaskAsCompleted(contextualMenu.elementId);
				break;
			case ContextMenuOpion.mark_as_incomplete:
				onMarkTaskAsInCompleted(contextualMenu.elementId);
				break;
			default:
				break;
		}
	}, [contextualMenu]);

	return (
		<>
			{isVisible && (
				<ContextualModal
					title='To zadanie zostanie trwale usunięte'
					contextualType={ContextMenuOpion.remove_task}
					onHandleAction={removeTaskMutation}>
					<span>{'Tej akcji nie można cofnąć'}</span>
				</ContextualModal>
			)}
		</>
	);
};
