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
				<div>
					<Eye onClick={handledSetPassword} className='icon-style text-fontColor absolute right-3' />
				</div>
			) : (
				<div>
					<EyeOff onClick={handledSetPassword} className='icon-style text-fontColor absolute right-3' />
				</div>
			)}
		</>
	);
};
