import { FC } from 'react';
import { Input } from '../formik/Input';
import { Formik, Form, FormikValues } from 'formik';
import { Loader } from 'react-feather';
import { ErrorMessageComponent } from '../formik/ErrorMessageComponent';

interface ITitleFormProps {
	isLoading: boolean;
	initialValues: FormikValues;
	validationSchema: unknown;
	onSubmit: (values: any, { resetForm }: any) => Promise<void>;
	placeholder?: string;
	className?: string;
	isIcon?: boolean;
}

export const TitleForm: FC<ITitleFormProps> = ({ isLoading, initialValues, placeholder, validationSchema, onSubmit, isIcon = false }) => {
	return (
		<div className='relative'>
			<Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit}>
				{({ errors, touched, isSubmitting, ...props }) => (
					<Form>
						{isLoading ? (
							<Loader className='animate-spin m-auto' />
						) : (
							<Input
								name='title'
								isIcon={isIcon}
								{...props}
								isLoading={isLoading}
								placeholder={placeholder}
								isSubmitting={isSubmitting}
							/>
						)}
						{errors.title && touched.title && <ErrorMessageComponent name='title' margin />}
					</Form>
				)}
			</Formik>
		</div>
	);
};
