import { FC, useCallback, useContext, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getFirstLetters } from '../utils/utilsFunctions';
import { Button } from './Button/Button';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { logoutUserAction } from '../actions/user';
import { useMutation } from 'react-query';
import { ROUTE } from '../enums';
import { SearchInput } from '../formik/SearchInput';
import { buildUrl } from '../utils/paths';

interface IHeader {
	userName: string;
}

export const Header: FC<IHeader> = ({ userName }) => {
	const name = useMemo(() => getFirstLetters(userName), [userName]);
	const history = useHistory();
	const { setAuthData } = useContext<AuthContextType>(AuthContext);

	const { mutate, isLoading } = useMutation(logoutUserAction);
	const logoutUser = useCallback(async () => {
		try {
			await mutate();
			setAuthData(undefined);
			history.push(buildUrl(ROUTE.login));
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<header className='flex justify-between items-center pl-4 pr-4 bg-blue h-12'>
			<Link to={buildUrl(ROUTE.home)} className='no-underline font-semibold text-white'>
				{'To Do'}
			</Link>
			<SearchInput />
			<div className='flex'>
				<div className='text-white mr-4 p-2 rounded-full border-solid border-2 border-white w-9 h-9 flex items-center justify-center'>
					{name}
				</div>
				<Button outlineWhite onClick={logoutUser} isLoading={isLoading}>
					Logout
				</Button>
			</div>
		</header>
	);
};
