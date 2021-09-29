import React from "react";
import styled from "styled-components";

export const COLOURS = {
    darkGrey: '#383636',
    grey: '#505050',
    lightGrey: '#f4f4f4',
    blue: '#8ea0ff',
    white: '#ffffff',
    red: '#c23732',
    green: '#5ca52d',
    border: '#6d6d6d',
    fontColor: '#34373d'
}

export const IconWrapper = styled.div<{ color: string, children: React.ReactNode }>`
    > svg {
        width: 1.2rem;
        height: 1.2rem;
        color: ${props => props.color ? props.color : `${COLOURS.fontColor}`};
    }
`;