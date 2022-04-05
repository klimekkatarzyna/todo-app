import { FC } from 'react';
import { ErrorMessage } from 'formik';

interface IErrorMessageComponent {
	name: string;
}

export const ErrorMessageComponent: FC<IErrorMessageComponent> = ({ name }) => (
	<ErrorMessage name={name}>{msg => <div className='text-sm absolute text-blue top-8 left-12'>{msg}</div>}</ErrorMessage>
);
