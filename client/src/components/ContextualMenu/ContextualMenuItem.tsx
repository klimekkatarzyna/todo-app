import { FC, useContext } from 'react';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from '../../constants';
import { IContextualMenu } from '../../interfaces/app';
import { MenuItem } from 'react-contextmenu';
import { ContextualMenuContext } from '../../ContextualMenuProvider';

const Item = styled(MenuItem)`
	display: inline-flex;
	align-items: center;
	padding: 0.5rem;
	cursor: pointer;
	&:hover {
		background-color: ${COLOURS.lightGrey};
	}
	> span {
		margin-left: 1rem;
	}
	&:last-child {
		border-top: 1px solid ${COLOURS.lightGrey};
		color: ${COLOURS.red};
	}
`;

interface IContextualMenuItem {
	listItem: IContextualMenu;
	elementId: string | undefined;
}

export const ContextualMenuItem: FC<IContextualMenuItem> = ({ listItem, elementId }) => {
	const { handleClick } = useContext(ContextualMenuContext);

	return (
		<Item data={{ ...listItem, elementId }} onClick={handleClick}>
			<IconWrapper color={COLOURS.fontColor}>{listItem.icon}</IconWrapper>
			<span className='text-sm'>{listItem.name}</span>
		</Item>
	);
};
