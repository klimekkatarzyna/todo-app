import { FC } from 'react';
import { ErrorMessage } from 'formik';

export const ErrorMessageComponent: FC<{ name: string; margin?: boolean }> = ({ name, margin }) => (
	<ErrorMessage name={name}>
		{msg => <div className={`text-sm absolute text-blue top-12 ${margin ? 'left-12' : 'left-2'}`}>{msg}</div>}
	</ErrorMessage>
);
