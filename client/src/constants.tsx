import { IContextualMenu } from './interfaces/app';
import { ContextualMenuOpion } from './enums';
import { LogOut, Users, Edit2, Calendar, Star, Sun, Trash2, FileMinus, Copy, CheckCircle, Plus } from 'react-feather';

export const contextualMenuFirstOpion: IContextualMenu[] = [
	{
		icon: <Sun className='icon-style' />,
		name: "Dodaj do widoku 'Mój dzień'",
		type: ContextualMenuOpion.add_new_task,
	},
	{
		icon: <Star className='icon-style' />,
		name: 'Oznacz jako wazne',
		type: ContextualMenuOpion.mark_as_done,
	},
	{
		icon: <CheckCircle className='icon-style' />,
		name: 'Oznacz jako wykonane',
		type: ContextualMenuOpion.move_task,
	},
	{
		icon: <Calendar className='icon-style' />,
		name: 'Termin wykonania: dzisiaj',
		type: ContextualMenuOpion.date_today,
	},
	{
		icon: <Calendar className='icon-style' />,
		name: 'Termin wykonania: jutro',
		type: ContextualMenuOpion.date_tomorrow,
	},
	{
		icon: <Plus className='icon-style' />,
		name: 'Utwórz nową listę z tego zadania',
		type: ContextualMenuOpion.move_task,
	},
	{
		icon: <FileMinus className='icon-style' />,
		name: 'Przenieś zadanie do...',
		type: ContextualMenuOpion.move_task,
	},
	{
		icon: <Copy className='icon-style' />,
		name: 'Kopiuj zadanie do...',
		type: ContextualMenuOpion.copy_task,
	},
	{
		icon: <Trash2 className='icon-style' />,
		name: 'Usuń zadanie',
		type: ContextualMenuOpion.remove_task,
	},
];

export const contextualMenuSecountOpion: IContextualMenu[] = [
	{
		icon: <Users className='icon-style' />,
		name: 'Opcje udostępniania',
		type: ContextualMenuOpion.sharing_options,
	},
	{
		icon: <Plus className='icon-style' />,
		name: 'Przenieś listę do... >',
		type: ContextualMenuOpion.move_list_to,
	},
	{
		icon: <FileMinus className='icon-style' />,
		name: 'Duplikuj listę',
		type: ContextualMenuOpion.duplicate_list,
	},
	{
		icon: <Copy className='icon-style' />,
		name: 'Wydrukuj listę',
		type: ContextualMenuOpion.print_list,
	},
	{
		icon: <Trash2 className='icon-style' />,
		name: 'Usuń listę',
		type: ContextualMenuOpion.remove_list,
	},
];

export const contextualMenuSecountOpionMembers: IContextualMenu[] = [
	{
		icon: <Users className='icon-style' />,
		name: 'Opcje udostępniania',
		type: ContextualMenuOpion.sharing_options,
	},
	{
		icon: <Plus className='icon-style' />,
		name: 'Przenieś listę do... >',
		type: ContextualMenuOpion.move_list_to,
	},
	{
		icon: <FileMinus className='icon-style' />,
		name: 'Duplikuj listę',
		type: ContextualMenuOpion.duplicate_list,
	},
	{
		icon: <Copy className='icon-style' />,
		name: 'Wydrukuj listę',
		type: ContextualMenuOpion.print_list,
	},
	{
		icon: <LogOut className='icon-style' />,
		name: 'Opuść listę',
		type: ContextualMenuOpion.leave_list,
	},
];

export const contextualMenuGroupOpion: IContextualMenu[] = [
	{
		icon: <Edit2 className='icon-style' />,
		name: 'Zmień nazwę grupy',
		type: ContextualMenuOpion.edit_group_name,
	},
	{
		icon: <Trash2 className='icon-style' />,
		name: 'Usuń grupę',
		type: ContextualMenuOpion.remove_group,
	},
];
