import { FC } from 'react';
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

const MENU_ID = 'blahblah';

export const DropdownComponent: FC = () => {
	const { show } = useContextMenu({
		id: MENU_ID,
	});

	function handleContextMenu(event: any) {
		event.preventDefault();
		show(event);
	}
	const handleItemClick = ({ event, props }: any) => console.log(event, props);

	return (
		<button className='ml-2 p-2 hover:bg-lightGrey'>
			<p onClick={handleContextMenu}>. . .</p>
			<Menu id={MENU_ID}>
				<Item onClick={handleItemClick}>Zmień nazwę</Item>
				<Submenu label='Przenieś listę do...'>
					<Item onClick={handleItemClick}>Sub Item 1</Item>
					<Item onClick={handleItemClick}>Sub Item 1</Item>
					<Item onClick={handleItemClick}>Sub Item 1</Item>
				</Submenu>
				<Submenu label='Zmień motyw'>
					<Item onClick={handleItemClick}>
						<span className='w-[30px] h-[30px] rounded bg-red' />
					</Item>
					<Item onClick={handleItemClick}>
						<span className='w-[30px] h-[30px] rounded bg-blue' />
					</Item>
					<Item onClick={handleItemClick}>
						<span className='w-[30px] h-[30px] rounded bg-green' />
					</Item>
				</Submenu>
				<Item onClick={handleItemClick}>Drukuj listę</Item>
				<Separator />
				<Item onClick={handleItemClick}>Usuń listę</Item>
			</Menu>
		</button>
	);
};
