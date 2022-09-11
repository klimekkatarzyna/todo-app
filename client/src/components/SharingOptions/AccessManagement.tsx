import { FC } from 'react';
import { Button } from '../Button/Button';
import { IList } from '@kkrawczyk/todo-common';
import { useMutation, useQueryClient } from 'react-query';
import { ArrowLeft } from 'react-feather';
import { removeInvitationAction } from '../../api/sharing';
import { QueryKey, ROUTE } from '../../enums';
import toast from 'react-hot-toast';

export const AccessManagement: FC<{ listDataResponse: IList | undefined; onPrevStep: () => void }> = ({ listDataResponse, onPrevStep }) => {
	const query = useQueryClient();

	const { mutate, isLoading } = useMutation(removeInvitationAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.getListById]);
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Udostępnianie zatrzymane');
		},
	});

	return (
		<div>
			<button onClick={onPrevStep} className='top-5 absolute cursor-pointer border-none bg-inherit'>
				<ArrowLeft size={20} />
			</button>
			<h2 className='text-center'>
				<strong>Zarządzanie dostępem</strong>
			</h2>
			<h3 className='text-sm text-darkerGrey'>{'Link do zapraszania'}</h3>
			<div className='w-80 break-all text-center mb-4 font-extralight'>{`${process.env.REACT_APP_API_URL_LOCAL}${ROUTE.sharing}?invitationToken=${listDataResponse?.invitationToken}`}</div>
			<Button className='button-secondary' onClick={() => mutate({ _id: listDataResponse?._id })} isLoading={isLoading}>
				{'Zatrzymaj udostępnianie'}
			</Button>
		</div>
	);
};
