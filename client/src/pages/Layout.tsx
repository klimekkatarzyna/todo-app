import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export const Layout = () => {
	const { authData } = useContext<AuthContextType>(AuthContext);

	return (
		<div className='flex flex-col flex-1'>
			{authData?._id && <Header userName={authData?.username || ''} />}
			<div className='flex flex-1'>
				{authData?._id && <Sidebar />}
				<Outlet />
			</div>
		</div>
	);
};