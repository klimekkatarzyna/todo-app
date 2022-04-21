import { FC } from 'react';
import { EyeOff, Eye } from 'react-feather';

interface IInputEye {
	showPassword: boolean;
	handledSetPassword: () => void;
}

export const InputEye: FC<IInputEye> = ({ showPassword, handledSetPassword }) => {
	return (
		<>
			{!showPassword ? (
				<Eye onClick={handledSetPassword} className='icon-style text-fontColor absolute right-5' />
			) : (
				<EyeOff onClick={handledSetPassword} className='icon-style text-fontColor absolute right-5' />
			)}
		</>
	);
};
