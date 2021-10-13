import React, { FC, useCallback, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { InputType } from '../../enums';
import FormikInput from '../../formik/Input';
import { Input } from '../Input/Input';
import useCreateList from './useCreateList';
import { useMutation } from 'react-query';
import { IListResponse } from '../../interfaces';

const Wrapper = styled.div`
    display: flex;
    border-right: 1px solid ${COLOURS.lightGrey};
    flex-direction: column;
    height: 100%;
    padding: 1rem 0;
    min-width: 250px;
    width: 50px;
    transition: width 180ms ease;
`;

interface ISidebar {

}

const CreateList: FC<ISidebar> = () => {
    const { createList } = useCreateList();
    const { mutate: mutateCreateList } = useMutation(createList);

    const onSubmit = useCallback((values, { setSubmitting }) => {
        console.log(values);
        mutateCreateList(values.title);
    }, []);

    return (
        <Wrapper>
            {/* TODO: */}
            <Formik
                initialValues={{ title: ''}}
                // validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => onSubmit(values, { setSubmitting })}
                render={({ isSubmitting, errors }) => (
                    <Form>
                        <Field
                            name='title'
                            type='text' 
                            placeholder='Nowa lista'
                            //component={FormikInput}
                            required
                            isIcon
                            inputType={InputType.primary} />
                        <button type='submit'>{'create'}</button>
                    </Form>
                )}
            />
            {/* <Input isIcon type={InputType.primary} placeholder={'Nowa lista'} /> */}
        </Wrapper>
    );
};

export default CreateList;