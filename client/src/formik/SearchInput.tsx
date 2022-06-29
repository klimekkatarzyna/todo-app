import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { ROUTE, QueryKey } from '../enums';
import { useQuery } from 'react-query';
import { ITask } from '@kkrawczyk/todo-common';
import { getTasksAction } from '../actions/tasks';
import { Input } from '../formik/Input';
import { ErrorMessageComponent } from '../formik/ErrorMessageComponent';
import { Formik, Form } from 'formik';
import { InputType } from '../interfaces/app';
import { useSetRecoilState } from 'recoil';
import { loadingState, searchResultState } from '../atoms/serching';
import { useHistory } from 'react-router-dom';
import { buildUrl } from '../utils/paths';

export const SearchInput: FC = () => {
	const setSearchResults = useSetRecoilState(searchResultState);
	const setIsLoading = useSetRecoilState(loadingState);

	const history = useHistory();
	const { data } = useQuery<ITask[] | undefined>([QueryKey.tasksList], () => getTasksAction());
	const [searchValue, setSearchValue] = useState<string>('');

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
			setSearchValue(values.title);
			history.push(buildUrl(ROUTE.search));
			setIsLoading(false);
		},
		[data]
	);

	useEffect(() => {
		const handleClick = (event: any) => {
			if (event?.target?.value === '') history.push(buildUrl(ROUTE.home));
		};

		document.addEventListener('search', handleClick);
		return () => document.removeEventListener('search', handleClick);
	}, []);

	const initialValues: ITask = { title: '' };

	useEffect(() => {
		setSearchResults(searchWithFuse(searchValue));
		setSearchValue(searchValue);
	}, [data, searchValue]);

	return (
		<div className='bg-light-grey w-96'>
			<Formik initialValues={initialValues} onSubmit={onSearch}>
				{({ errors, touched, isSubmitting, ...props }) => (
					<Form>
						<Input
							className='w-full bg-light-grey focus:bg-white'
							name='title'
							type={InputType.search}
							isSubmitting={isSubmitting}
							{...props}
						/>
						{errors.title && touched.title && <ErrorMessageComponent name='title' margin />}
					</Form>
				)}
			</Formik>
		</div>
	);
};
