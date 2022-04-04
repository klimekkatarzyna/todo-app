import { ErrorMessage } from 'formik';
import { FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../constants';

const Error = styled.div`
	color: ${COLOURS.blue};
	position: absolute;
	font-size: 0.8rem;
	top: 2rem;
	left: 3.3em;
	background: ${COLOURS.lightGrey};
`;

interface IErrorMessageComponent {
	name: string;
}

export const ErrorMessageComponent: FC<IErrorMessageComponent> = ({ name }) => <ErrorMessage name={name}>{msg => <Error>{msg}</Error>}</ErrorMessage>;
