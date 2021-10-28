import React from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;

    span {
        border: 0.4rem solid #afafaf;
        border-radius: 50%;
        border-top: 0.4rem solid ${COLOURS.blue};
        width: 0.8rem;
        height: 0.8rem;
        animation: spin 2s linear infinite;

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }

        }
    }
`;

const Loader = () => {
    return (
        <Container>
            <span />
        </Container>
    );
};

export default Loader;