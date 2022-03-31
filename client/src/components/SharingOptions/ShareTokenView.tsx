import { FC, useContext } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { ContextualMenuOpion } from '../../enums';
import { IList } from '@kkrawczyk/todo-common';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { Modal } from '../Modal/Modal';
import { Member, Dot } from './Member';
import { RemoveMember } from './RemoveMember';
import { ShareLink } from './ShareLink';

const Wrapper = styled.div`
	h3 {
		color: ${COLOURS.darkerGrey};
		font-size: 0.9rem;
	}

	> div {
		display: flex;
		align-items: center;
	}

	span {
		color: ${COLOURS.darkerGrey};
		font-size: 0.8rem;
		margin-left: auto;
	}
`;

interface IShareTokenViewProps {
	onNextStep: () => void;
	listDataResponse: IList;
}

export const ShareTokenView: FC<IShareTokenViewProps> = ({ onNextStep, listDataResponse }) => {
	const { isVisible } = useContext(ModalVisibilityContext);

	return (
		<Wrapper>
			<h2 className='text-center'>
				<strong>Udostępnij listę</strong>
			</h2>
			<h3>Członkowie listy</h3>
			<div>
				<Dot /> {listDataResponse?.owner} <span>{'Właściciel'}</span>
			</div>
			{listDataResponse?.members?.map(member => (
				<Member key={member} member={member} listDataResponse={listDataResponse} />
			))}{' '}
			{/*TODO: display name of user or email*/}
			<ShareLink listDataResponse={listDataResponse} />
			<RemoveMember onNextStep={onNextStep} listDataResponse={listDataResponse} />
			{isVisible && <Modal title='Czy chcesz opuścić listę?' onHandleAction={() => {}} contextualType={ContextualMenuOpion.leave_list} />}
		</Wrapper>
	);
};
