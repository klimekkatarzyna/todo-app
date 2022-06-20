import { FC } from 'react';
import { EyeOff, Eye } from 'react-feather';

export const EyeComponent: FC<{ showPassword: boolean; handledSetPassword: () => void }> = ({ showPassword, handledSetPassword }) => {
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
