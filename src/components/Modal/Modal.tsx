import { FC, useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { Button } from '../Button/Button';
import { useShowModal } from '../../hooks/useShowModal';
import { ContextualMenuOpion } from '../../enums';
import { ContextualMenuContext } from '../../ContextualMenuProvider';

const ModalBackground = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	padding: 1rem;
	left: 0px;
	top: 0px;
	right: 0px;
	z-index: 12;
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.25);
	transition: all 200ms ease-out 0s;
	opacity: 1;
	visibility: visible;
`;

const ModalContent = styled.div`
	min-width: 250px;
	height: 150px;
	border-radius: 0.3rem;
	background-color: ${COLOURS.white};
	padding: 1rem;
`;

const Title = styled.div`
	font-weight: 600;
	margin-bottom: 1rem;
	color: ${COLOURS.fontColor};
`;

const Subtitle = styled.div`
	color: ${COLOURS.fontColor};
`;

const ButtonsWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 2rem;
`;

interface IModal {
	title: string;
	subtitle?: string;
	contextualType: ContextualMenuOpion;
	onHandleAction?: any;
}

export const Modal: FC<IModal> = ({ title, subtitle, onHandleAction, contextualType }) => {
	const { contextualMenu } = useContext(ContextualMenuContext);
	const { isModalVisible, onCloseModal, onOpeneModal } = useShowModal();

	useEffect(() => {
		if (contextualMenu?.type === contextualType) {
			onOpeneModal();
		}
	}, [contextualMenu]);

	const onHandleActionAndClose = useCallback(() => {
		onCloseModal();
		onHandleAction?.(contextualMenu?.elementId);
	}, [contextualMenu]);

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.code === 'Enter') {
				onHandleActionAndClose();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [contextualMenu]);

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				onCloseModal();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, []);

	return (
		<>
			{isModalVisible && (
				<ModalBackground>
					<ModalContent>
						<Title>{title}</Title>
						<Subtitle>{subtitle}</Subtitle>
						<ButtonsWrapper>
							<Button onClick={onCloseModal}>{'Anuluj'}</Button>
							<Button type='button' secondary onClick={onHandleActionAndClose}>
								{'Usuwanie'}
							</Button>
						</ButtonsWrapper>
					</ModalContent>
				</ModalBackground>
			)}
		</>
	);
};
