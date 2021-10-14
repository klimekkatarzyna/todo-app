import React, { FC, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { COLOURS } from '../constants';
import { AuthContext } from '../AuthContext';
import { returnsFirstChar, splitChar } from '../utils/utilsFunctions';
import Button from './Button/Button';
import { HttpResponse } from '../utils/http';
import { IUserData } from '../interfaces';

const HraderWrapper = styled.div`
    padding: 0.5rem 1rem;
    background-color: ${COLOURS.blue};
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
        color: ${COLOURS.white};
        text-decoration: none;
        font-weight: 600;
    }
`;

const DropdownWrapper = styled.div`
    display: flex;
`;

const Name = styled.div`
    border: 1px solid ${COLOURS.white};
    border-radius: 50%;
    color: ${COLOURS.white};
    margin-right: 1rem;
    padding: 0.4rem;
`;

interface IHeader {
    userName: string;
}

const Header: FC<IHeader> = ({ userName }) => {
    const { logout, setAuthData, loginoutData } = useContext(AuthContext);
    const [ firstChar, secChar ] = splitChar(userName);

    const logoutUser = useCallback(async () => {
        try {
            localStorage.removeItem('token');
            setAuthData({} as React.SetStateAction<HttpResponse<IUserData>>);
            await logout('');
        } catch {
            
        }
    }, []);

    return (
        <HraderWrapper>
            <Link to='/'>{'To Do'}</Link>
            <DropdownWrapper>
            <Name>{returnsFirstChar(firstChar)} {returnsFirstChar(secChar)}</Name>
            <Button outline onClick={logoutUser}>Logout</Button>
            </DropdownWrapper>
        </HraderWrapper>
    );
};

export default Header;