import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { COLOURS } from '../constants';
import { AuthContext } from '../AuthContext';

const HraderWrapper = styled.div`
    padding: 0.5rem;
    background-color: ${COLOURS.blue};

    a {
        color: ${COLOURS.white};
        text-decoration: none;
        font-weight: 600;
    }
`;

const Name = styled.div`
    border: 1px solid ${COLOURS.white};
    border-radius: 50%;
`;

interface IHeader {
    userName: string;
}

const Header: FC<IHeader> = ({ userName }) => {
    const { logout, authData } = useContext(AuthContext);

    return (
        <HraderWrapper>
            <Link to='/my_day'>{'To Do'}</Link>
            <Name>{userName}</Name>
            <button onClick={() => logout(authData?.token as string)}>Logout user</button>
        </HraderWrapper>
    );
};

export default Header;