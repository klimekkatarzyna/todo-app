import { useMemo } from 'react';

const useAppColor = (colorType: string) => {
	const color = useMemo(
		() =>
			(colorType === 'grey' && 'text-fontColor') ||
			(colorType === 'blue' && 'text-blue') ||
			(colorType === 'red' && 'text-red') ||
			(colorType === 'green' && ' text-green'),
		[colorType]
	);

	return {
		color,
	};
};

export default useAppColor;
