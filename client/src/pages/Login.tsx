import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOURS } from '../constants';
import { Button } from '../components/Button/Button';
import { useMutation } from 'react-query';
import { useAuthorization } from '../hooks/useAuthorization';
import { InputType } from '../interfaces/app';
import { ErrorMessageComponent } from '../formik/ErrorMessageComponent';
import { Input } from '../formik/Input';
import { Formik, Form } from 'formik';
import { loginValidationSchema, LoginValidationType } from '@kkrawczyk/todo-common';

export const FormWrapper = styled.div`
	background-color: ${COLOURS.lightGrey};
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	form {
		width: 100%;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${COLOURS.white};
	padding: 2rem;
	min-width: 300px;

	h2,
	a {
		color: ${COLOURS.blue};
	}
`;

export const Login: FC = () => {
	const initialValues = { email: '', password: '' };
	const { loginRequest } = useAuthorization();
	const { mutateAsync, isLoading, data } = useMutation(loginRequest);

	const onSubmit = useCallback(async (values: LoginValidationType, { resetForm }) => {
		await mutateAsync({ email: values.email, password: values.password });
		resetForm();
	}, []);

	return (
		<FormWrapper>
			<Content>
				<h2>Zaloguj się</h2>
				<p>
					Nie masz masz konta? <Link to='/register'>Rejestruj się!</Link>
				</p>

				{data?.error && <span>{data?.error as string}</span>}

				<Formik initialValues={initialValues as LoginValidationType} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
					{({ errors, touched, ...props }) => (
						<Form>
							<div className='relative'>
								<Input name='email' placeholder={'Email'} {...props} />
								{errors.email && touched.email ? <ErrorMessageComponent name='email' /> : null}
							</div>

							<div className='relative'>
								<Input name='password' type={InputType.password} placeholder={'Password'} {...props} />
								{errors.password && touched.password ? <ErrorMessageComponent name='password' /> : null}
							</div>

							<Button primary type='submit' margin isLoading={isLoading}>
								<span>Zaloguj</span>
							</Button>
						</Form>
					)}
				</Formik>
			</Content>
		</FormWrapper>
	);
};
