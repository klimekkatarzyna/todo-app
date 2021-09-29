import React, { FC } from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    margin-top: auto;
`;

interface ICreateListElement {

}

export const CreateListElement: FC<ICreateListElement> = () => {
    return (
        <Wrapper>
            {'dupa'}
        </Wrapper>
    )
}