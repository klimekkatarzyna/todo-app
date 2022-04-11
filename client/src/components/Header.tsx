import { FC, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { COLOURS } from '../constants';
import { returnsFirstChar, splitChar } from '../utils/utilsFunctions';
import { Button } from './Button/Button';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { logoutUserAction } from '../actions/user';
import { useMutation } from 'react-query';

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

export const Header: FC<IHeader> = ({ userName }) => {
	const [firstChar, secChar] = splitChar(userName);
	const history = useHistory();
	const { setAuthData } = useContext<AuthContextType>(AuthContext);

	const { mutate, isLoading } = useMutation(logoutUserAction);
	const logoutUser = useCallback(async () => {
		try {
			await mutate();
			setAuthData(undefined);
			history.push('/login');
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<HraderWrapper>
			<Link to='/'>{'To Do'}</Link>
			<div className='flex'>
				<Name>
					{returnsFirstChar(firstChar)} {returnsFirstChar(secChar)}
				</Name>
				<Button outline onClick={logoutUser} isLoading={isLoading}>
					Logout
				</Button>
			</div>
		</HraderWrapper>
	);
};
