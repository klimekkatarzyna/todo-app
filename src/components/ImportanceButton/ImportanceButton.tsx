import React, { FC } from 'react';
import { Star } from '@styled-icons/feather/Star';
import { COLOURS, IconWrapper } from '../../constants';
import Tooltip from '../Tooltip/Tooltip';
import styled from 'styled-components';
import useMouseHandling from '../../hooks/useMouseHandling';

const ImportanceButtonWrapper = styled.div`
    position: relative;
`;

interface IImportanceButton {
    isChecked: boolean;
}

const ImportanceButton: FC<IImportanceButton> = ({ isChecked }) => {
    const { isFocused, onBlur, onFocus } = useMouseHandling();

    return (
        <ImportanceButtonWrapper>
            {isFocused && <Tooltip position={'bottom'} display={isFocused}>{'Oznacz zadanie jako wazne'}</Tooltip>}
            <IconWrapper
                color={COLOURS.blue}
                isChecked={isChecked}
                onFocus={onFocus}
                onBlur={onBlur}>
                <Star />
            </IconWrapper>
        </ImportanceButtonWrapper>
    );
};

export default ImportanceButton;