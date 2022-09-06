import { FC, useCallback, useContext } from 'react';
import { ContextMenuComponent } from '../../ContextMenu/ContextMenuComponent';
import { TaskDetails } from '../TaskDetails';
import { ITask } from '@kkrawczyk/todo-common';
import { useBuidContextTaskMenu } from '../../../hooks/useBuildContextTaskMenu';
import { TasksContextMenuContext } from '../../../providers/TasksContextMenuProvider';
import { useRecoilState } from 'recoil';
import { elementVisibilityState } from '../../../atoms/elementVisibility';
import { useShowMenuContexify } from '../../../hooks/useShowMenuContexify';
import { ContextMenuOpion } from '../../../enums';

interface ITaskItem {
	task: ITask;
	index: number;
	redirectTo: string;
}

export const TaskItem: FC<ITaskItem> = ({ task, index, redirectTo }) => {
	const { handleItemClick } = useContext(TasksContextMenuContext);
	const { displayMenu } = useShowMenuContexify(task._id);
	const [, setIsElementVisible] = useRecoilState(elementVisibilityState);
	const { taskMenuListItems } = useBuidContextTaskMenu(task);

	const onSelectTask = useCallback((): void => {
		setIsElementVisible(true);
	}, [setIsElementVisible]);

	return (
		<>
			<div onContextMenu={displayMenu}>
				<div
					className={`task-item flex items-center relative h-[3.5rem] p-[0.9rem] bg-white mb-1 md:mb-2 cursor-pointer shadow-sm hover:bg-lightBlue active:bg-lightBlue border-solid border-b-[1px] border-border-500 rounded`}
					key={index}
					draggable
					onClick={onSelectTask}>
					<TaskDetails taskData={task} redirectTo={redirectTo} />
				</div>
			</div>
			<ContextMenuComponent
				contextMenuList={taskMenuListItems}
				elementDetails={task || ''}
				handleItemClick={handleItemClick}
				contextMenuOption={ContextMenuOpion.move_task}
			/>
		</>
	);
};
