import { FC } from "react";
import { Route, Redirect } from "react-router-dom";

interface IPrivateRoute {
	path: string;
	exact?: boolean;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children, ...rest }) => {
  const token = localStorage.getItem('token');

  return (
      <Route
          {...rest}
			render={({ location }) =>
			token ? (
              children
            ) : (
				<Redirect to={{
					pathname: "/login",
					state: { from: location }
				}} />
            )
          }
     	/>
  	);
}

export default PrivateRoute;