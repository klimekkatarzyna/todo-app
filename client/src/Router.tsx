import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { ROUTE } from './enums';
import { MyDay } from './pages/MyDay';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Searching } from './pages/Searching';
import { Sharing } from './pages/Sharing';
import { Tasks } from './pages/Tasks';
import { Assigned } from './pages/Assigned';
import { Planned } from './pages/Planned';
import { Important } from './pages/Important';
import { Redirect } from './pages/Redirect';
import { Layout } from './pages/Layout';
import { Inbox } from './pages/Inbox';
import { NotFound } from './pages/NotFound';

export const BrowserRouter: FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route
					path={ROUTE.home}
					element={
						<PrivateRoute>
							<MyDay />
						</PrivateRoute>
					}></Route>
				<Route
					path={ROUTE.myDay}
					element={
						<PrivateRoute>
							<MyDay />
						</PrivateRoute>
					}></Route>
				<Route
					path={`${ROUTE.myDay}/:listId/:taskId`}
					element={
						<PrivateRoute>
							<MyDay />
						</PrivateRoute>
					}></Route>
				<Route
					path={ROUTE.important}
					element={
						<PrivateRoute>
							<Important />
						</PrivateRoute>
					}></Route>
				<Route
					path={`${ROUTE.important}/:listId/:taskId`}
					element={
						<PrivateRoute>
							<Important />
						</PrivateRoute>
					}></Route>
				<Route
					path={ROUTE.planned}
					element={
						<PrivateRoute>
							<Planned />
						</PrivateRoute>
					}></Route>
				<Route
					path={ROUTE.assigned}
					element={
						<PrivateRoute>
							<Assigned />
						</PrivateRoute>
					}></Route>
				<Route
					path={`${ROUTE.assigned}/:listId/:taskId`}
					element={
						<PrivateRoute>
							<Assigned />
						</PrivateRoute>
					}></Route>
				<Route
					path={ROUTE.inbox}
					element={
						<PrivateRoute>
							<Inbox />
						</PrivateRoute>
					}></Route>
				<Route
					path={`${ROUTE.listsDetails}`}
					element={
						<PrivateRoute>
							<Tasks />
						</PrivateRoute>
					}></Route>
				<Route
					path={`${ROUTE.tasks}/:listId/:taskId`}
					element={
						<PrivateRoute>
							<Tasks />
						</PrivateRoute>
					}></Route>
				<Route
					path={`${ROUTE.jointToList}/sharing`}
					element={
						<PrivateRoute>
							<Sharing />
						</PrivateRoute>
					}></Route>
				<Route
					path={ROUTE.search}
					element={
						<PrivateRoute>
							<Searching />
						</PrivateRoute>
					}></Route>
				<Route
					path={`${ROUTE.search}/:listId/:taskId`}
					element={
						<PrivateRoute>
							<Searching />
						</PrivateRoute>
					}></Route>
				<Route
					path='*'
					element={
						<PrivateRoute>
							<NotFound />
						</PrivateRoute>
					}></Route>
				<Route path={ROUTE.register} element={<Register />} />
				<Route path={ROUTE.login} element={<Login />} />
				<Route path={ROUTE.sharing} element={<Redirect />} />
			</Route>
		</Routes>
	);
};
