import { FC, RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ContextMenuContext } from '../../providers/ContextMenuProvider';
import { ContextMenuOpion, QueryKey } from '../../enums';
import { useMutation, useQueryClient } from 'react-query';
import { editGroup } from '../../api/groups';
import { isStringContainsOnlyWhitespace } from '../../utils/utilsFunctions';
import { createEditGroupSchema, IGroup } from '@kkrawczyk/todo-common';
import toast from 'react-hot-toast';
import { useFocusingHandling } from '../../hooks/useMouseHandling';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from 'react-feather';
import { InputType } from '../../interfaces/app';
import { useTranslation } from 'react-i18next';

interface IEditGroupProps {
	title: string | undefined;
	groupId: string | undefined;
	isNavClosed?: boolean;
}

export const EditGroup: FC<IEditGroupProps> = ({ title, groupId, isNavClosed }) => {
	const { t } = useTranslation();
	const query = useQueryClient();
	const [isInputVisible, setIsInputVisible] = useState(false);
	const { contextualMenu, setContextMenu } = useContext(ContextMenuContext);

	const elementRef: RefObject<HTMLInputElement> = useRef(null);
	const { onBlur, onFocus } = useFocusingHandling(elementRef);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IGroup>({
		resolver: yupResolver(createEditGroupSchema),
	});

	const { mutateAsync, isLoading } = useMutation(editGroup, {
		onSuccess: async response => {
			query.setQueryData<IGroup[] | undefined>([QueryKey.groups], groups =>
				groups?.map(group => (group._id === response.data?._id ? { ...group, title: response.data?.title } : group))
			);
			toast.success(t('edit-group-success'));
		},
	});

	const onSubmit: SubmitHandler<IGroup> = useCallback(
		async (data, e) => {
			if (isStringContainsOnlyWhitespace(data.title)) return;
			await mutateAsync({ _id: contextualMenu?.elementId, title: data.title });
			e?.target.reset();
			setIsInputVisible(false);
			setContextMenu(undefined);
			onBlur();
		},
		[setIsInputVisible, setContextMenu, onBlur, contextualMenu?.elementId, mutateAsync]
	);

	useEffect(() => {
		setIsInputVisible(contextualMenu?.type === ContextMenuOpion.edit_group_name && contextualMenu?.elementId === groupId);
	}, [contextualMenu, groupId]);

	return (
		<div>
			{isInputVisible ? (
				<form className='w-full mt-2 flex' onSubmit={handleSubmit(onSubmit)}>
					<div className='w-full flex items-center border-none outline-none pt-2 pr-0 pb-2 pl-2'>
						{isLoading && <Loader />}
						<input
							autoFocus
							className='input-styles'
							type={InputType.text}
							placeholder={t('group-placeholder')}
							{...register('title', { required: true })}
							onFocus={onFocus}
							defaultValue={title}
						/>
						{errors.title && <div className='input-error-styles'>{errors.title?.message}</div>}
					</div>
				</form>
			) : (
				<p className={`my-0 mx-2 font-semibold ${isNavClosed ? 'hidden' : 'flex'} text-base md:text-sm`}>{title}</p>
			)}
		</div>
	);
};
