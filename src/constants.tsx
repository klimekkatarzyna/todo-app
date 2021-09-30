import React from "react";
import styled, { css } from "styled-components";

export const COLOURS = {
    darkGrey: '#383636',
    darkerGrey: '#767678',
    grey: '#505050',
    lightGrey: '#f4f4f4',
    blue: '#8ea0ff',
    white: '#ffffff',
    red: '#c23732',
    green: '#5ca52d',
    border: '#6d6d6d',
    fontColor: '#34373d'
}

interface IIconWrapper {
    color: string;
    children: React.ReactNode;
    isChecked?: boolean;
}

export const IconWrapper = styled.div<IIconWrapper>`
    > svg {
        width: 1.2rem;
        height: 1.2rem;
        color: ${props => props.color ? props.color : `${COLOURS.fontColor}`};
        ${props => props.isChecked && css`
            fill: ${props.color};
            stroke: ${props.color};
        `};
    }
`;