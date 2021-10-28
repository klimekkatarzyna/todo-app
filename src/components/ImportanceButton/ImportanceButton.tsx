import React, { FC } from 'react';
import styled from 'styled-components';
import { Star } from '@styled-icons/feather/Star';
import { COLOURS, IconWrapper } from '../../constants';
import Tooltip from '../Tooltip/Tooltip';

const ImportanceButtonWrapper = styled.div`
    position: relative;
`;

interface IImportanceButton {
    isChecked: boolean;
}

const ImportanceButton: FC<IImportanceButton> = ({ isChecked }) => {
    return (
        <ImportanceButtonWrapper>
            <Tooltip position={'right'} text={'Oznacz zadanie jako wazne'}>
                <IconWrapper
                    color={COLOURS.blue}
                    isChecked={isChecked}>
                    <Star />
                </IconWrapper>
            </Tooltip>
        </ImportanceButtonWrapper>
    );
};

export default ImportanceButton;