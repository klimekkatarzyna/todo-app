import { FC } from 'react';
import { EyeOff, Eye } from 'react-feather';

interface IEyeComponent {
	showPassword: boolean;
	handledSetPassword: () => void;
}

export const EyeComponent: FC<IEyeComponent> = ({ showPassword, handledSetPassword }) => {
	return (
		<>
			{!showPassword ? (
				<Eye onClick={handledSetPassword} className='icon-style text-fontColor absolute right-5 top-2' />
			) : (
				<EyeOff onClick={handledSetPassword} className='icon-style text-fontColor absolute right-5 top-2' />
			)}
		</>
	);
};
