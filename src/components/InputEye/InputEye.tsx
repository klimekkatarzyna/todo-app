import { FC } from 'react';
import { Eye } from '@styled-icons/feather/Eye';
import { EyeOff } from '@styled-icons/feather/EyeOff';
import { IconWrapperStyled } from '../../constants';

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
