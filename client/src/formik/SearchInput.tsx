import { FC, useCallback, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { QueryKey, SideMenu } from '../enums';
import { useQuery } from 'react-query';
import { ITask } from '@kkrawczyk/todo-common';
import { getTasksAction } from '../actions/tasks';
import { Input } from '../formik/Input';
import { ErrorMessageComponent } from '../formik/ErrorMessageComponent';
import { Formik, Form } from 'formik';
import { InputType } from '../interfaces/app';
import { useRecoilState } from 'recoil';
import { loadingState, searchResultState } from '../atoms/serching';
import { useHistory } from 'react-router-dom';

export const SearchInput: FC = () => {
	const [searchResults, setSearchResults] = useRecoilState(searchResultState);
	const [isLoading, setIsLoading] = useRecoilState(loadingState);

	const history = useHistory();
	const { data } = useQuery<ITask[] | undefined>([QueryKey.tasksList], () => getTasksAction());

	const fuse = useMemo(
		() =>
			new Fuse(data as ITask[], {
				shouldSort: true,
				threshold: 0.1,
				location: 0,
				distance: 100,
				keys: ['title'],
			}),
		[data]
	);

	const searchWithFuse = useCallback(
		(query: string) => {
			if (!query) return [];
			return fuse?.search?.(query)?.map(result => result?.item);
		},
		[data]
	);

	const onSearch = useCallback(
		values => {
			setIsLoading(true);
			setSearchResults(searchWithFuse(values.title));
			history.push(`/${SideMenu.search}`);
			setIsLoading(false);
		},
		[data]
	);

	useEffect(() => {
		const handleClick = (event: any) => {
			if (event?.target?.value === '') history.push(SideMenu.myDay);
		};

		document.addEventListener('search', handleClick);
		return () => document.removeEventListener('search', handleClick);
	}, []);

	const initialValues: ITask = { title: '' };

	return (
		<div className='bg-light-grey w-96'>
			<Formik initialValues={initialValues} onSubmit={onSearch}>
				{({ errors, touched, ...props }) => (
					<Form>
						<Input className='w-full bg-light-grey focus:bg-white' name='title' type={InputType.search} {...props} />
						{errors.title && touched.title && <ErrorMessageComponent name='title' margin />}
					</Form>
				)}
			</Formik>
		</div>
	);
};
