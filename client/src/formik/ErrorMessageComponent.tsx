import { FC } from 'react';
import { ErrorMessage } from 'formik';

interface IErrorMessageComponent {
	name: string;
	margin?: boolean;
}

export const ErrorMessageComponent: FC<IErrorMessageComponent> = ({ name, margin }) => (
	<ErrorMessage name={name}>{msg => <div className={`text-sm absolute text-blue top-8 ${margin ? 'left-12' : 'left-2'}`}>{msg}</div>}</ErrorMessage>
);
