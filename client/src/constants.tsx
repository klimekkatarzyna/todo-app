import { IContextMenu } from './interfaces/app';
import { ContextMenuOpion } from './enums';
import { LogOut, Users, Edit2, Trash2, FileMinus, Copy, Plus } from 'react-feather';

export const contextualMenuSecountOpion: IContextMenu[] = [
	{
		icon: <Users className='icon-style' />,
		name: 'Opcje udostępniania',
		type: ContextMenuOpion.sharing_options,
	},
	{
		icon: <Plus className='icon-style' />,
		name: 'Przenieś listę do...',
		type: ContextMenuOpion.move_list_to,
	},
	{
		icon: <FileMinus className='icon-style' />,
		name: 'Duplikuj listę',
		type: ContextMenuOpion.duplicate_list,
	},
	{
		icon: <Copy className='icon-style' />,
		name: 'Wydrukuj listę',
		type: ContextMenuOpion.print_list,
	},
	{
		icon: <Trash2 className='icon-style' />,
		name: 'Usuń listę',
		type: ContextMenuOpion.remove_list,
	},
];

export const contextualMenuSecountOpionMembers: IContextMenu[] = [
	{
		icon: <Users className='icon-style' />,
		name: 'Opcje udostępniania',
		type: ContextMenuOpion.sharing_options,
	},
	{
		icon: <Plus className='icon-style' />,
		name: 'Przenieś listę do...',
		type: ContextMenuOpion.move_list_to,
	},
	{
		icon: <FileMinus className='icon-style' />,
		name: 'Duplikuj listę',
		type: ContextMenuOpion.duplicate_list,
	},
	{
		icon: <Copy className='icon-style' />,
		name: 'Wydrukuj listę',
		type: ContextMenuOpion.print_list,
	},
	{
		icon: <LogOut className='icon-style' />,
		name: 'Opuść listę',
		type: ContextMenuOpion.leave_list,
	},
];

export const contextualMenuGroupOpion: IContextMenu[] = [
	{
		icon: <Edit2 className='icon-style' />,
		name: 'Zmień nazwę grupy',
		type: ContextMenuOpion.edit_group_name,
	},
	{
		icon: <Trash2 className='icon-style' />,
		name: 'Usuń grupę',
		type: ContextMenuOpion.remove_group,
	},
];
