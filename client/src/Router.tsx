import { FC, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MyDay } from './pages/MyDay';
import { Important } from './pages/Important';
import { Planned } from './pages/Planned';
import { Sidebar } from './components/Sidebar';
import { Inbox } from './pages/Inbox';
import { Assigned } from './pages/Assigned';
import { PrivateRoute } from './PrivateRoute';
import { Login } from './pages/Login';
import Register from './pages/Register';
import { Header } from './components/Header';
import { Tasks } from './pages/Tasks';
import { NotFound } from './pages/NotFound';
import { AuthContext, AuthContextType } from './AuthProvider';
import { Loader } from 'react-feather';
import { Sharing } from './pages/Sharing';
import { Redirect } from './pages/Redirect';

const BrowserRouter: FC = () => {
	const { authData, isCheckSessionLoading, sessionChecked } = useContext<AuthContextType>(AuthContext);

	return (
		<div className='flex flex-col flex-1'>
			{isCheckSessionLoading && sessionChecked ? (
				<Loader className='m-auto' />
			) : (
				<Router>
					{authData?._id && <Header userName={authData?.username || ''} />}
					<div className='flex flex-1'>
						{authData?._id && <Sidebar />}
						<Switch>
							{authData?._id !== undefined && sessionChecked !== undefined ? (
								<>
									<PrivateRoute exact path='/'>
										<MyDay />
									</PrivateRoute>
									<PrivateRoute exact path='/important'>
										<Important />
									</PrivateRoute>
									<PrivateRoute exact path='/planned'>
										<Planned />
									</PrivateRoute>
									<PrivateRoute exact path='/assigned_to_me'>
										<Assigned />
									</PrivateRoute>
									<PrivateRoute exact path='/inbox'>
										<Inbox />
									</PrivateRoute>
									<PrivateRoute exact path='/tasks/:listId'>
										<Tasks />
									</PrivateRoute>
									<PrivateRoute exact path='/tasks/:listId/:taskId'>
										<Tasks />
									</PrivateRoute>
									<PrivateRoute exact path='/jointToList/tasks/sharing'>
										<Sharing />
									</PrivateRoute>

									{/* <Route render={(routeProps) => {
                                return (
                                    <NotFound />
                                );
                            }} /> */}
								</>
							) : (
								<>
									<Route path='/register'>
										<Register />
									</Route>
									<Route path='/login'>
										<Login />
									</Route>
									<Route path='/tasks/sharing'>
										<Redirect />
									</Route>
								</>
							)}
						</Switch>
					</div>
				</Router>
			)}
		</div>
	);
};

export default BrowserRouter;
