import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { ContextMenuOpion, QueryKey } from '../../enums';
import { useMutation, useQueryClient } from 'react-query';
import { editGroup } from '../../actions/groups';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { createEditGroupSchema, CreateEditGroupType, IGroup } from '@kkrawczyk/todo-common';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';

interface IEditGroupProps {
	title: string | undefined;
	groupId: string | undefined;
	isNavClosed?: boolean;
}

export const EditGroup: FC<IEditGroupProps> = ({ title, groupId, isNavClosed }) => {
	const query = useQueryClient();
	const [isInputVisible, setIsInputVisible] = useState(false);
	const { contextualMenu } = useContext(ContextMenuContext);

	const { mutateAsync, error, isLoading } = useMutation(editGroup, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.groups]);
			toast.success('Nazwa grupy zmieniona');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	const initialValues: IGroup = { title: title };

	const onSubmit = useCallback(async (values: CreateEditGroupType, { resetForm }) => {
		if (isStringContainsWhitespace(values.title)) return;
		await mutateAsync({ _id: groupId, title: values.title });
		resetForm();
		setIsInputVisible(false);
	}, []);

	useEffect(() => {
		setIsInputVisible(contextualMenu?.type === ContextMenuOpion.edit_group_name && contextualMenu?.elementId === groupId);
	}, [contextualMenu]);

	return (
		<div>
			{isInputVisible ? (
				<TitleForm
					placeholder={'Grupa bez nazwy'}
					isIcon
					isLoading={isLoading}
					initialValues={initialValues as CreateEditGroupType}
					validationSchema={createEditGroupSchema}
					onSubmit={onSubmit}
				/>
			) : (
				<p className={`text-sm my-0 mx-2 font-semibold ${isNavClosed ? 'hidden' : 'flex'}`}>{title}</p>
			)}
		</div>
	);
};
