import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { InputVersion } from '../../../enums';
import { Input } from '../../Input/Input';
import { COLOURS } from '../../../constants';
import { handleResertInput, removesWhitespaceFromString } from '../../../utils/utilsFunctions';
import { http } from '../../../utils/http';
import { IList } from '@kkrawczyk/todo-common';
import * as api from '../../../services';
import { useMutation, useQueryClient } from 'react-query';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	transition: width 180ms ease;
	background-color: ${COLOURS.lightGrey};
	width: 210px;
`;

export const CreateList: FC = () => {
	const query = useQueryClient();
	const [listName, setListName] = useState<string | undefined>(undefined);

	const createListAction = useCallback(
		async (title: string | undefined) =>
			await http<IList>(api.createList, 'POST', {
				title,
				taskNumber: 0,
			}),
		[]
	);
	const {
		mutate: createListMutation,
		isLoading: createListLoading,
		error: createListError,
	} = useMutation(createListAction, {
		onSuccess: () => {
			query.invalidateQueries(['lists']);
		},
	});

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const clearStr = removesWhitespaceFromString(event.target?.value);
		setListName(clearStr);
	}, []);

	const onSubmit = useCallback(
		async (event: React.SyntheticEvent): Promise<void> => {
			event.preventDefault();

			await createListMutation(listName);
			handleResertInput(setListName);
			//TODO: redirect on created list
		},
		[listName]
	);

	return (
		<Wrapper>
			<form onSubmit={onSubmit}>
				<Input
					name='newList'
					isIcon
					colorType={InputVersion.primary}
					placeholder={'Nowa lista'}
					value={listName as string}
					onChange={handleChange}
				/>
			</form>
		</Wrapper>
	);
};
