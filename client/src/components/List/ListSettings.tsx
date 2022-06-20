import { AppColor } from '@kkrawczyk/todo-common';
import { FC, useCallback, useContext } from 'react';
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { formToEditListTitleVisibilityState } from '../../atoms';
import { useList } from '../../hooks/useList';
import { useListDetails } from '../../hooks/useListDetails';
import { useSharingData } from '../../hooks/useSharingData';
import { useSwitchToFirstListItem } from '../../hooks/useSwitchToFirstListItem';
import { IUseParams } from '../../interfaces/app';
import { ThemeContext } from '../../providers/ThemeContext';

const MENU_ID = 'listSettings';

enum ContextMenuItem {
	theme_red = 'red',
	theme_blue = 'blue',
	theme_green = 'green',
	theme_dark = 'dark',
	change_title = 'change_title',
	print_list = 'print_list',
	remove_list = 'remove_list',
	leave_list = 'leave_list',
}

export const ListSettings: FC = () => {
	const { show } = useContextMenu({
		id: 'listSettings',
	});
	const { onHandleSwitchToFirstListItem } = useSwitchToFirstListItem();
	const { listId } = useParams<IUseParams>();
	const { removeListMutation, editListThemeMutation } = useList();
	const { data } = useListDetails();
	const { isOwner } = useSharingData(data?.userId);
	const themes = [ContextMenuItem.theme_red, ContextMenuItem.theme_green, ContextMenuItem.theme_blue, ContextMenuItem.theme_dark];
	const { setTheme } = useContext(ThemeContext);

	const [, setIsFormVisible] = useRecoilState(formToEditListTitleVisibilityState);

	const handleContextMenu = useCallback(event => {
		event.preventDefault();
		show(event);
	}, []);

	const handleItemClick = useCallback(
		async ({ data }) => {
			switch (data.elementId) {
				case ContextMenuItem.change_title:
					setIsFormVisible(true);
					break;
				case ContextMenuItem.theme_red:
					setTheme(AppColor.red);
					await editListThemeMutation({ _id: listId, themeColor: AppColor.red });
					break;
				case ContextMenuItem.theme_blue:
					setTheme(AppColor.blue);
					await editListThemeMutation({ _id: listId, themeColor: AppColor.blue });
					break;
				case ContextMenuItem.theme_green:
					setTheme(AppColor.green);
					await editListThemeMutation({ _id: listId, themeColor: AppColor.green });
					break;
				case ContextMenuItem.theme_dark:
					setTheme(AppColor.dark);
					await editListThemeMutation({ _id: listId, themeColor: AppColor.dark });
					break;
				case ContextMenuItem.remove_list:
					await removeListMutation({ _id: listId });
					onHandleSwitchToFirstListItem();
					break;
				default:
					break;
			}
		},
		[listId]
	);

	return (
		<button className='ml-2 p-2 hover:bg-lightGrey'>
			<p onClick={handleContextMenu}>. . .</p>
			<Menu id={MENU_ID}>
				<Item data={{ elementId: ContextMenuItem.change_title }} onClick={handleItemClick}>
					Zmień nazwę
				</Item>
				{isOwner && (
					<Submenu label='Zmień motyw'>
						{themes.map(theme => (
							<Item key={theme} data={{ elementId: theme }} onClick={handleItemClick}>
								<span className={`w-[30px] h-[30px] rounded bg-${theme}`} />
							</Item>
						))}
					</Submenu>
				)}
				<Item data={{ elementId: ContextMenuItem.print_list }} onClick={handleItemClick}>
					Drukuj listę
				</Item>
				<Separator />
				{isOwner ? (
					<Item data={{ elementId: ContextMenuItem.remove_list }} onClick={handleItemClick}>
						Usuń listę
					</Item>
				) : (
					<Item data={{ elementId: ContextMenuItem.leave_list }} onClick={handleItemClick}>
						Opuść listę
					</Item>
				)}
			</Menu>
		</button>
	);
};