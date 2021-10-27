import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { COLOURS } from '../../constants';

const TooltipWrapper = styled.div`
    position: relative;
`;

const TooltipBody = styled.div<{ position: 'top' | 'bottom', show: boolean }>`
    background-color: ${COLOURS.white};
    padding: 0.7rem;
    border-radius: 0.3rem;
    width: fit-content;
    display: none;
    position: absolute;
    font-size: 0.8rem;
    left: -75px;
    top: -52px;
    box-shadow: rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px;
    z-index: 2;

    ${props => props.show && css`
        display: flex;
    `};

    &:after {
        content: '';
        position: absolute;
        left: 43%;
        top: ${props => props.position === 'top' ? '-20px' : 'auto'};

        ${props => props.position === 'bottom' && css`
            bottom: -15px;
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

const Text = styled.span`
    white-space: nowrap;
`;

interface ITooltip {
    children: React.ReactNode;
    position: 'top' | 'bottom';
    text?: string;
}

const Tooltip: FC<ITooltip> = ({ children, position, text }) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <TooltipWrapper>
            <TooltipBody  position={position} show={show}>
               <Text>{text}</Text>
            </TooltipBody>
            <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {children}
            </div>
        </TooltipWrapper>
    );
};

export default Tooltip;