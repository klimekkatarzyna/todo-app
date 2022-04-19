import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { ContextualMenuContext } from '../../ContextualMenuProvider';
import { ContextualMenuOpion, QueryKey } from '../../enums';
import { useMutation, useQueryClient } from 'react-query';
import { editGroup } from '../../actions/groups';
import { Input } from '../../formik/Input';
import { Formik, Form } from 'formik';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { ErrorMessageComponent } from '../../formik/ErrorMessageComponent';
import { createEditGroupSchema, CreateEditGroupType, IGroup } from '@kkrawczyk/todo-common';

interface IEditGroupProps {
	title: string | undefined;
	groupId: string | undefined;
	isNavClosed?: boolean;
}

export const EditGroup: FC<IEditGroupProps> = ({ title, groupId, isNavClosed }) => {
	const query = useQueryClient();
	const [isInputVisible, setIsInputVisible] = useState(false);
	const { contextualMenu } = useContext(ContextualMenuContext);

	const { mutate, error, isLoading } = useMutation(editGroup, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.groups]);
		},
	});

	const initialValues: IGroup = { title: title };

	const onSubmit = useCallback(async (values: CreateEditGroupType, { resetForm }) => {
		if (isStringContainsWhitespace(values.title)) return;
		await mutate({ _id: groupId, title: values.title });
		resetForm();
		setIsInputVisible(false);
	}, []);

	useEffect(() => {
		setIsInputVisible(contextualMenu?.type === ContextualMenuOpion.edit_group_name && contextualMenu?.elementId === groupId);
	}, [contextualMenu]);

	return (
		<div>
			{isInputVisible ? (
				<div className='relative'>
					<Formik
						initialValues={initialValues as CreateEditGroupType}
						enableReinitialize
						validationSchema={createEditGroupSchema}
						onSubmit={onSubmit}>
						{({ errors, touched, ...props }) => (
							<Form>
								<Input name='title' placeholder={'Grupa bez nazwy'} isIcon {...props} isLoading={isLoading} autoFocus />
								{errors.title && touched.title ? <ErrorMessageComponent name='title' /> : null}
							</Form>
						)}
					</Formik>
				</div>
			) : (
				<p className={`text-sm my-0 mx-2 font-semibold ${isNavClosed ? 'hidden' : 'flex'}`}>{title}</p>
			)}
		</div>
	);
};
