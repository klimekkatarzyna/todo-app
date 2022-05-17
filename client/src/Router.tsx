import { FC, useContext, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { AuthContext, AuthContextType } from './AuthProvider';
import { Loader } from 'react-feather';
import { ROUTE, SideMenu } from './enums';

const BrowserRouter: FC = () => {
	const MyDay = lazy(() => import('./pages/MyDay').then(module => ({ default: module.MyDay })));
	const Important = lazy(() => import('./pages/Important').then(module => ({ default: module.Important })));
	const Planned = lazy(() => import('./pages/Planned').then(module => ({ default: module.Planned })));
	const Sidebar = lazy(() => import('./components/Sidebar').then(module => ({ default: module.Sidebar })));
	const Inbox = lazy(() => import('./pages/Inbox').then(module => ({ default: module.Inbox })));
	const Assigned = lazy(() => import('./pages/Assigned').then(module => ({ default: module.Assigned })));
	const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
	const Tasks = lazy(() => import('./pages/Tasks').then(module => ({ default: module.Tasks })));
	const Header = lazy(() => import('./components/Header').then(module => ({ default: module.Header })));
	const Sharing = lazy(() => import('./pages/Sharing').then(module => ({ default: module.Sharing })));
	const Redirect = lazy(() => import('./pages/Redirect').then(module => ({ default: module.Redirect })));
	const Register = lazy(() => import('./pages/Register').then(module => ({ default: module.Register })));
	const Searching = lazy(() => import('./pages/Searching').then(module => ({ default: module.Searching })));

	const { authData, isCheckSessionLoading, sessionChecked } = useContext<AuthContextType>(AuthContext);

	return (
		<div className='flex flex-col flex-1'>
			{isCheckSessionLoading && sessionChecked ? (
				<Loader className='m-auto' />
			) : (
				<Router>
					<Suspense fallback={<Loader className='m-auto' />}>
						{authData?._id && <Header userName={authData?.username || ''} />}
						<div className='flex flex-1'>
							{authData?._id && <Sidebar />}
							<Switch>
								{authData?._id !== undefined && sessionChecked !== undefined ? (
									<>
										<PrivateRoute exact path={ROUTE.home}>
											<MyDay />
										</PrivateRoute>
										<PrivateRoute exact path={`${ROUTE.myDay}/:listId/:taskId`}>
											<MyDay />
										</PrivateRoute>
										<PrivateRoute exact path={ROUTE.important}>
											<Important />
										</PrivateRoute>
										<PrivateRoute exact path={`${ROUTE.important}/:listId/:taskId`}>
											<Important />
										</PrivateRoute>
										<PrivateRoute exact path={ROUTE.planned}>
											<Planned />
										</PrivateRoute>
										<PrivateRoute exact path={ROUTE.assigned}>
											<Assigned />
										</PrivateRoute>
										<PrivateRoute exact path={`${ROUTE.assigned}/:listId/:taskId`}>
											<Assigned />
										</PrivateRoute>
										<PrivateRoute exact path={ROUTE.inbox}>
											<Inbox />
										</PrivateRoute>
										<PrivateRoute exact path={`${ROUTE.listsDetails}`}>
											<Tasks />
										</PrivateRoute>
										<PrivateRoute exact path={`${ROUTE.tasks}/:listId/:taskId`}>
											<Tasks />
										</PrivateRoute>
										<PrivateRoute exact path={`${ROUTE.jointToList}/sharing`}>
											<Sharing />
										</PrivateRoute>
										<PrivateRoute exact path={ROUTE.search}>
											<Searching />
										</PrivateRoute>
										<PrivateRoute exact path={`${ROUTE.search}/:listId/:taskId`}>
											<Searching />
										</PrivateRoute>
										{/* <Route render={(routeProps) => {
                                return (
                                    <NotFound />
                                );
                            }} /> */}
									</>
								) : (
									<>
										<Route path={ROUTE.register}>
											<Register />
										</Route>
										<Route path={ROUTE.login}>
											<Login />
										</Route>
										<Route path={ROUTE.sharing}>
											<Redirect />
										</Route>
									</>
								)}
							</Switch>
						</div>
					</Suspense>
				</Router>
			)}
		</div>
	);
};

export default BrowserRouter;
