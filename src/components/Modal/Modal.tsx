import { FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import Button from '../Button/Button';
import useShowModal from '../../hooks/useShowModal';

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
}

const Modal: FC<IModal> = ({ title, subtitle }) => {
	const { onCloseModal } = useShowModal();

	return (
		<ModalBackground>
			<ModalContent>
				<Title>{title}</Title>
				<Subtitle>{subtitle}</Subtitle>
				<ButtonsWrapper>
					<Button onClick={onCloseModal}>{'Anuluj'}</Button>
					<Button secondary onClick={onCloseModal}>
						{'Usuwanie'}
					</Button>
				</ButtonsWrapper>
			</ModalContent>
		</ModalBackground>
	);
};

export default Modal;
