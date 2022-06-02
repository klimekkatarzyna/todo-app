import { FC, RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { ContextMenuOpion, QueryKey } from '../../enums';
import { useMutation, useQueryClient } from 'react-query';
import { editGroup } from '../../actions/groups';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { createEditGroupSchema, CreateEditGroupType, IGroup } from '@kkrawczyk/todo-common';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';
import { IQueryError } from '../../interfaces/app';
import { useFocusingHandling } from '../../hooks/useMouseHandling';

interface IEditGroupProps {
	title: string | undefined;
	groupId: string | undefined;
	isNavClosed?: boolean;
}

export const EditGroup: FC<IEditGroupProps> = ({ title, groupId, isNavClosed }) => {
	const query = useQueryClient();
	const [isInputVisible, setIsInputVisible] = useState(false);
	const { contextualMenu, setContextMenu } = useContext(ContextMenuContext);

	const elementRef: RefObject<HTMLInputElement> = useRef(null);
	const { isFocused, onClick, onBlur } = useFocusingHandling(elementRef);

	const { mutateAsync, error, isLoading } = useMutation(editGroup, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.groups]);
			toast.success('Nazwa grupy zmieniona');
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	const initialValues: IGroup = { title: title };

	const onSubmit = useCallback(async (values: CreateEditGroupType, { resetForm }) => {
		if (isStringContainsWhitespace(values.title)) return;
		await mutateAsync({ _id: groupId, title: values.title });
		resetForm();
		setIsInputVisible(false);
		setContextMenu(undefined);
		onBlur();
	}, []);

	useEffect(() => {
		setIsInputVisible((contextualMenu?.type === ContextMenuOpion.edit_group_name && contextualMenu?.elementId === groupId) || isFocused);
	}, [contextualMenu, isFocused]);

	return (
		<div ref={elementRef} onClick={onClick} onBlur={onBlur}>
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
