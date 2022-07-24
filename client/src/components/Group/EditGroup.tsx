import { FC, RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { ContextMenuOpion, QueryKey } from '../../enums';
import { useMutation, useQueryClient } from 'react-query';
import { editGroup } from '../../actions/groups';
import { isStringContainsOnlyWhitespace } from '../../utils/utilsFunctions';
import { createEditGroupSchema, CreateEditGroupType, IGroup } from '@kkrawczyk/todo-common';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';
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
		onSuccess: async response => {
			query.setQueryData<IGroup[] | undefined>([QueryKey.groups], (groups: IGroup[] | undefined) => [...(groups || []), response.body || {}]);
			toast.success('Nazwa grupy zmieniona');
		},
	});

	const initialValues: IGroup = { title: title };

	const onSubmit = useCallback(
		async (values: CreateEditGroupType, { resetForm }) => {
			if (isStringContainsOnlyWhitespace(values.title)) return;
			await mutateAsync({ _id: groupId, title: values.title });
			resetForm();
			setIsInputVisible(false);
			setContextMenu(undefined);
			onBlur();
		},
		[groupId, setIsInputVisible, setContextMenu, onBlur]
	);

	useEffect(() => {
		setIsInputVisible((contextualMenu?.type === ContextMenuOpion.edit_group_name && contextualMenu?.elementId === groupId) || isFocused);
	}, [contextualMenu, groupId, isFocused]);

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
