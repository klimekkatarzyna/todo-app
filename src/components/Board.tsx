import React, { FC } from "react";
import styled from 'styled-components';
import bg from '../assets/default.jpeg';

const Wrapper = styled.div`
    display: flex;
    padding: 1rem 0;
    width: 100%;
    height: 100%;
    position: relative;
`;

const Background = styled.div`
    background: url('${bg}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
`;

interface IBoard {

}

export const Board: FC<IBoard> = () => {
    return (
        <Wrapper>
            <Background />
        </Wrapper>
    )
}