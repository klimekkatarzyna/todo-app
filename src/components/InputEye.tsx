import { FC } from 'react';
import styled from 'styled-components';
import { Eye } from '@styled-icons/feather/Eye';
import { EyeOff } from '@styled-icons/feather/EyeOff';
import { IconWrapper } from '../constants';

export const IconWrapperStyled = styled(IconWrapper)`
	position: absolute;
	right: 10px;
`;

interface IInputEye {
	showPassword: boolean;
	handledSetPassword: () => void;
}

export const InputEye: FC<IInputEye> = ({ showPassword, handledSetPassword }) => {
	return (
		<>
			{!showPassword ? (
				<IconWrapperStyled color={'grey'}>
					<Eye onClick={handledSetPassword} />
				</IconWrapperStyled>
			) : (
				<IconWrapperStyled color={'grey'}>
					<EyeOff onClick={handledSetPassword} />
				</IconWrapperStyled>
			)}
		</>
	);
};
