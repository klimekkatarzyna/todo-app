import { FC } from "react";
import {
  Route,
  Redirect
} from "react-router-dom";

interface IPrivateRoute {
	path: string;
	exact?: boolean;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        localStorage.getItem('token') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;