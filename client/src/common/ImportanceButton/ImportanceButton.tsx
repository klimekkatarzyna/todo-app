import { FC, useMemo } from 'react';
import { Star } from 'react-feather';
import { Tooltip } from '../Tooltip/Tooltip';
import { useTranslation } from 'react-i18next';

export const ImportanceButton: FC<{ isChecked: boolean; onClick: () => void }> = ({ isChecked, onClick }) => {
	const { t } = useTranslation();
	const tooltipText = useMemo(() => (!isChecked ? t('mark-as-completed') : t('remove-importance')), [isChecked, t]);

	return (
		<button onClick={onClick} className='relative border-none bg-inherit'>
			<input type='checkbox' checked={isChecked} onChange={() => {}} className='hidden' />
			<Tooltip position={'right'} text={tooltipText}>
				<div>
					<Star className={`icon-style stroke-blue ${isChecked && 'fill-blue'}`} />
				</div>
			</Tooltip>
		</button>
	);
};
