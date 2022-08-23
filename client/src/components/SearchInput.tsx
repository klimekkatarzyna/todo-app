import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { ROUTE, QueryKey } from '../enums';
import { useQuery } from 'react-query';
import { ITask } from '@kkrawczyk/todo-common';
import { getTasksAction } from '../actions/tasks';
import { InputType } from '../interfaces/app';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loadingState, searchResultState } from '../atoms/serching';
import { useNavigate } from 'react-router-dom';
import { buildUrl } from '../utils/paths';
import { mobileNavVisibilityState } from '../atoms';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Loader } from 'react-feather';

export const SearchInput: FC = () => {
	const setSearchResults = useSetRecoilState(searchResultState);
	const setIsLoading = useSetRecoilState(loadingState);
	const [, setIsVisible] = useRecoilState(mobileNavVisibilityState);

	const navigate = useNavigate();
	const { data, isLoading } = useQuery<ITask[] | undefined>([QueryKey.tasksList], () => getTasksAction());
	const [searchValue, setSearchValue] = useState<string | undefined>('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ITask>();

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
		(query: string | undefined) => {
			if (!query) return [];
			return fuse?.search?.(query)?.map(result => result?.item);
		},
		[fuse]
	);

	const onSearch: SubmitHandler<ITask> = useCallback(
		data => {
			setIsLoading(true);
			setSearchResults(searchWithFuse(data.title));
			setSearchValue(data.title);
			navigate(buildUrl(ROUTE.search));
			setIsVisible(false);
			setIsLoading(false);
		},
		[setIsLoading, setSearchResults, searchWithFuse, navigate]
	);

	useEffect(() => {
		const handleClick = (event: any) => {
			if (event?.target?.value === '') navigate(buildUrl(ROUTE.home));
		};

		document.addEventListener('search', handleClick);
		return () => document.removeEventListener('search', handleClick);
	}, [navigate]);

	useEffect(() => {
		setSearchResults(searchWithFuse(searchValue));
		setSearchValue(searchValue);
	}, [data, searchValue, setSearchResults, searchWithFuse, setSearchValue]);

	return (
		<div className='bg-light-grey w-auto md:w-96'>
			<div className='flex items-center rounded py-0 cursor-pointer w-full relative'>
				<form className='w-full flex' onSubmit={handleSubmit(onSearch)}>
					{isLoading && <Loader />}
					<input autoFocus className='input-styles' type={InputType.search} {...register('title', { required: true })} />
					{errors.title && <div className='input-error-styles'>{errors.title?.message}</div>}
				</form>
			</div>
		</div>
	);
};
