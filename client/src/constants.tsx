import { IContextMenu } from './interfaces/app';
import { ContextMenuOpion } from './enums';
import { LogOut, Users, Edit2, Trash2, FolderMinus, Copy, Plus } from 'react-feather';
import i18next from './i18n';

export const contextualMenuSecountOpion: IContextMenu[] = [
	{
		icon: <Users className='icon-style' />,
		name: i18next.t('sharing-options'),
		type: ContextMenuOpion.sharing_options,
	},
	{
		icon: <Plus className='icon-style' />,
		name: i18next.t('move-list'),
		type: ContextMenuOpion.move_list_to,
	},
	{
		icon: <Copy className='icon-style' />,
		name: i18next.t('print-list'),
		type: ContextMenuOpion.print_list,
	},
	{
		icon: <Trash2 className='icon-style' />,
		name: i18next.t('remove-list'),
		type: ContextMenuOpion.remove_list,
	},
];

export const contextualMenuSecountOpionMembers: IContextMenu[] = [
	{
		icon: <Users className='icon-style' />,
		name: i18next.t('sharing-options'),
		type: ContextMenuOpion.sharing_options,
	},
	{
		icon: <Plus className='icon-style' />,
		name: i18next.t('move-list'),
		type: ContextMenuOpion.move_list_to,
	},
	{
		icon: <Copy className='icon-style' />,
		name: i18next.t('print-list'),
		type: ContextMenuOpion.print_list,
	},
	{
		icon: <LogOut className='icon-style' />,
		name: i18next.t('leave-list'),
		type: ContextMenuOpion.leave_list,
	},
];

export const contextualMenuGroup: IContextMenu[] = [
	{
		icon: <Edit2 className='icon-style' />,
		name: i18next.t('change-group-name'),
		type: ContextMenuOpion.edit_group_name,
	},
	{
		icon: <Trash2 className='icon-style' />,
		name: i18next.t('remove-group'),
		type: ContextMenuOpion.remove_group,
	},
];

export const contextualMenuGroupedLists: IContextMenu[] = [
	{
		icon: <Edit2 className='icon-style' />,
		name: i18next.t('change-group-name'),
		type: ContextMenuOpion.edit_group_name,
	},
	{
		icon: <FolderMinus className='icon-style' />,
		name: i18next.t('ungroup-lsts'),
		type: ContextMenuOpion.ungroup_lists,
	},
	{
		icon: <Trash2 className='icon-style' />,
		name: i18next.t('remove-group'),
		type: ContextMenuOpion.remove_group,
	},
];
