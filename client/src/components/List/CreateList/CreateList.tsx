import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../../constants';
import { isStringContainsWhitespace } from '../../../utils/utilsFunctions';
import { useMutation, useQueryClient } from 'react-query';
import { createListAction } from '../../../actions/lists';
import { Formik, Form } from 'formik';
import { createListSchema } from '@kkrawczyk/todo-common';
import { Input } from '../../../formik/Input';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	transition: width 180ms ease;
	background-color: ${COLOURS.lightGrey};
	width: 210px;
`;

export const CreateList: FC = () => {
	const query = useQueryClient();

	const { mutate, isLoading, error } = useMutation(createListAction, {
		onSuccess: () => {
			query.invalidateQueries(['lists']);
		},
	});

	const onSubmit = useCallback(async (values: ICreateListValue, { resetForm }) => {
		await mutate(!isStringContainsWhitespace(values.title) ? values.title : 'Lista bez tytułu');
		resetForm();
		//TODO: redirect on created list
	}, []);

	interface ICreateListValue {
		title: string;
	}

	const initialValues: ICreateListValue = { title: '' };

	return (
		<Wrapper>
			<Formik initialValues={initialValues} validationSchema={createListSchema} onSubmit={onSubmit}>
				{props => (
					<Form>
						<Input name='title' placeholder={'Nowa lista'} isIcon {...props} isLoading={isLoading} />
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};
