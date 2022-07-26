import { FC, useContext, useMemo } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { getFirstLetters } from '../utils/utilsFunctions';
import { Button } from '../common/Button/Button';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { logoutUserAction } from '../api/user';
import { useMutation } from 'react-query';
import { ROUTE } from '../enums';
import { SearchInput } from './SearchInput';
import { buildUrl } from '../utils/paths';
import { useTranslation } from 'react-i18next';

export const Header: FC<{ userName: string }> = ({ userName }) => {
	const { t } = useTranslation();
	const name = useMemo(() => getFirstLetters(userName), [userName]);
	const navigate = useNavigate();
	const { setAuthData } = useContext<AuthContextType>(AuthContext);
	const isSharingView = useMatch(`${ROUTE.jointToList}/sharing`);

	const { mutate, isLoading } = useMutation(logoutUserAction, {
		onSuccess: () => {
			setAuthData(undefined);
			navigate(buildUrl(ROUTE.login), { replace: true });
		},
	});

	return (
		<>
			{!isSharingView && (
				<header className='flex justify-between items-center pl-4 pr-4 bg-blue h-12 print:hidden'>
					<Link to={buildUrl(ROUTE.home)} className='no-underline font-semibold text-white'>
						{'To Do'}
					</Link>
					<SearchInput />
					<div className='flex'>
						<div className='text-white mr-4 p-2 rounded-full border-solid border-2 border-white w-9 h-9 flex items-center justify-center'>
							{name}
						</div>
						<Button className='button-outlineWhite' onClick={() => mutate()} isLoading={isLoading}>
							{t('logout')}
						</Button>
					</div>
				</header>
			)}
		</>
	);
};
