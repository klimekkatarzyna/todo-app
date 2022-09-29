import { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from './AuthProvider';
import { ROUTE } from './enums';

export const PrivateRoute: FC<{ children: JSX.Element }> = ({ children }) => {
	const { authData } = useContext<AuthContextType>(AuthContext);

	if (!authData?._id) {
		<Navigate to={ROUTE.login} />;
	}

	return children;
};
