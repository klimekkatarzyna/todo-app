import { FC, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext, AuthContextType } from './AuthProvider';

interface IPrivateRoute {
	path: string;
	exact?: boolean;
}

export const PrivateRoute: FC<IPrivateRoute> = ({ children, ...rest }) => {
	const { authData } = useContext<AuthContextType>(AuthContext);

	return (
		<Route
			{...rest}
			render={({ location }) =>
				authData?._id !== undefined ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};
