import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { Star } from 'react-feather';
import { COLOURS, IconWrapper } from '../../constants';
import { Tooltip } from '../Tooltip/Tooltip';

const ImportanceButtonWrapper = styled.button`
	position: relative;
	border: none;
	background: inherit;

	input {
		display: none;
	}
`;

interface IImportanceButton {
	isChecked: boolean;
	onClick: () => void;
}

export const ImportanceButton: FC<IImportanceButton> = ({ isChecked, onClick }) => {
	const tooltipText = useMemo(() => (!isChecked ? 'Oznacz zadanie jako wazne' : 'Usuń ważność'), [isChecked]);

	return (
		<ImportanceButtonWrapper onClick={onClick}>
			<input type='checkbox' checked={isChecked} onChange={() => {}} />
			<Tooltip position={'right'} text={tooltipText}>
				<IconWrapper
					color={COLOURS.blue} // TODO: theme color
					isChecked={isChecked}>
					<Star stroke-width={1} />
				</IconWrapper>
			</Tooltip>
		</ImportanceButtonWrapper>
	);
};
