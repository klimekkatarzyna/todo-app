import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { InputVersion } from '../../../enums';
import { Input } from '../../Input/Input';
import { useList } from '../useList';
import { COLOURS } from '../../../constants';
import { handleResertInput, removesWhitespaceFromString } from '../../../utils/utilsFunctions';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	transition: width 180ms ease;
	background-color: ${COLOURS.lightGrey};
	width: 210px;
`;

export const CreateList: FC = () => {
	const [listName, setListName] = useState<string | undefined>(undefined);
	const { mutateCreateList } = useList();

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const clearStr = removesWhitespaceFromString(event.target?.value);
		setListName(clearStr);
	}, []);

	const onSubmit = useCallback(
		async (event: React.SyntheticEvent): Promise<void> => {
			event.preventDefault();
			try {
				await mutateCreateList(listName);
				handleResertInput(setListName);
				//TODO: redirect on created list
			} catch {
				//TODO: handle error & show notificayion
			}
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
