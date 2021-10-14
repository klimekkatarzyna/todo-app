import { FC, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext, AuthContextType } from "./AuthContext";

interface IPrivateRoute {
	path: string;
	exact?: boolean;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children, ...rest }) => {
	const { authData } = useContext<AuthContextType>(AuthContext);
	const token = localStorage.getItem('token');
	console.log('PrivateRoute >>>>>', token, authData);
	return (
		<Route {...rest} render={({ location }) =>
			authData?.auth ? (
				children
			) : (
				<Redirect to={{
					pathname: "/login",
					state: { from: location }
				}} />
			)
		}/>
	);
}

export default PrivateRoute;