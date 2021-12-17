import { FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { IContextualMenu } from '../../interfaces/list';
import { ContextualMenuItem } from './ContextualMenuItem';
import { ContextMenu } from 'react-contextmenu';

const ContextualMenuWrapper = styled(ContextMenu)`
	background-color: ${COLOURS.white};
	display: flex;
	flex-direction: column;
	color: ${COLOURS.fontColor};
	box-shadow: 1px 1px 12px 0px #cacaca;
	max-width: 280px;
	position: absolute;
	top: 20px;
	right: -50px;
	z-index: 1;
`;

interface IContextualMenuProps {
	contextualMenuList: IContextualMenu[];
	elementId: string;
}

export const ContextualMenu: FC<IContextualMenuProps> = ({ contextualMenuList, elementId }) => {
	return (
		<ContextualMenuWrapper id={elementId}>
			{contextualMenuList.map(listItem => (
				<ContextualMenuItem key={listItem?.name} listItem={listItem} elementId={elementId} />
			))}
		</ContextualMenuWrapper>
	);
};
