import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { COLOURS } from '../../constants';

const TooltipWrapper = styled.div<{ position: 'top' | 'bottom', display: boolean }>`
    //max-width: 100px;
    position: relative;
    justify-content: center;
    display: none;
    position: absolute;
    font-size: 0.8rem;

    ${props => props.display && css`
        display: flex;
        top: -45px;
    `};

    &:after {
        content: '';
        position: absolute;
        top: ${props => props.position === 'top' ? '-20px' : 'inherit'};

        ${props => props.position === 'bottom' && css`
            bottom: -20px;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 20px solid ${COLOURS.white};
        `};

        ${props => props.position === 'top' && css`
            top: -20px;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 20px solid ${COLOURS.white};
        `};
    }
`;

const TooltipBody = styled.div`
    background-color: ${COLOURS.white};
    padding: 0.7rem;
    border-radius: 0.3rem;
    width: 100%;
`;

interface ITooltip {
    children: React.ReactNode;
    position: 'top' | 'bottom';
    display: boolean;
}

const Tooltip: FC<ITooltip> = ({ children, position, display }) => {
    // TODO: position of all tooltip
    return (
        <TooltipWrapper position={position} display={display}>
            <TooltipBody>
                {children}
            </TooltipBody>
        </TooltipWrapper>
    );
};

export default Tooltip;