import { FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { IContextualMenu } from '../../interfaces/app';
import { ContextualMenuItem } from './ContextualMenuItem';
import { ContextMenu } from 'react-contextmenu';

const ContextualMenuWrapper = styled(ContextMenu)`
	box-shadow: 1px 1px 12px 0px #cacaca;
`;
interface IContextualMenuProps {
	contextualMenuList: IContextualMenu[];
	elementId: string | undefined;
}

export const ContextualMenu: FC<IContextualMenuProps> = ({ contextualMenuList, elementId }) => {
	return (
		<ContextualMenuWrapper
			id={elementId as string}
			className='flex flex-col bg-white absolute top-5 max-w-280 z-10 text-fontColor right-[-50px] w-80'>
			{contextualMenuList.map(listItem => (
				<ContextualMenuItem key={listItem?.name} listItem={listItem} elementId={elementId} />
			))}
		</ContextualMenuWrapper>
	);
};
