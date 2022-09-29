import { ContextMenuOpion } from '../enums';
import { IContextMenu } from '../interfaces/app';
import { Calendar, Star, Sun, Trash2, FileMinus, CheckCircle } from 'react-feather';
import { Importance, ITask, ITaskStatus } from '@kkrawczyk/todo-common';
import { useMemo } from 'react';

export const useBuidContextTaskMenu = (task: ITask) => {
	const AddToMyDayContextMenuItem: IContextMenu = {
		icon: <Sun className='icon-style' />,
		name: "Dodaj do widoku 'Mój dzień'",
		type: ContextMenuOpion.add_to_myday,
	};

	const RemoveFromMyDayContextMenuItem: IContextMenu = {
		icon: <Sun className='icon-style' />,
		name: "Usuń z widoku 'Mój dzień'",
		type: ContextMenuOpion.remove_from_myday,
	};

	const MarkAsImportantContextMenuItem: IContextMenu = {
		icon: <Star className='icon-style' />,
		name: 'Oznacz jako wazne',
		type: ContextMenuOpion.mark_as_important,
	};

	const RemoveImportanceContextMenuItem: IContextMenu = {
		icon: <Star className='icon-style' />,
		name: 'Usuń ważność',
		type: ContextMenuOpion.remove_importance,
	};

	const RemoveTaskContextMenuItem: IContextMenu = {
		icon: <Trash2 className='icon-style' />,
		name: 'Usuń zadanie',
		type: ContextMenuOpion.remove_task,
	};

	const MarkAsCompleteContextMenuItem: IContextMenu = {
		icon: <CheckCircle className='icon-style' />,
		name: 'Oznacz jako wykonane',
		type: ContextMenuOpion.mark_as_complete,
	};

	const MarkAsIncompleteContextMenuItem: IContextMenu = {
		icon: <CheckCircle className='icon-style' />,
		name: 'Oznacz jako niewykonane',
		type: ContextMenuOpion.mark_as_incomplete,
	};

	const DateTodayContextMenuItem: IContextMenu = {
		icon: <Calendar className='icon-style' />,
		name: 'Termin wykonania: dzisiaj',
		type: ContextMenuOpion.date_today,
	};

	const DateTomorrowContextMenuItem: IContextMenu = {
		icon: <Calendar className='icon-style' />,
		name: 'Termin wykonania: jutro',
		type: ContextMenuOpion.date_tomorrow,
	};

	const MoveTaskContextMenuItem: IContextMenu = {
		icon: <FileMinus className='icon-style' />,
		name: 'Przenieś zadanie do...',
		type: ContextMenuOpion.move_task,
	};

	const taskMenuListItems = useMemo(
		() => [
			task?.isMyDay ? RemoveFromMyDayContextMenuItem : AddToMyDayContextMenuItem,
			task?.importance === Importance.high ? RemoveImportanceContextMenuItem : MarkAsImportantContextMenuItem,
			task?.taskStatus === ITaskStatus.inComplete ? MarkAsCompleteContextMenuItem : MarkAsIncompleteContextMenuItem,
			DateTodayContextMenuItem,
			DateTomorrowContextMenuItem,
			MoveTaskContextMenuItem,
			RemoveTaskContextMenuItem,
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[task]
	);

	return {
		taskMenuListItems,
	};
};
