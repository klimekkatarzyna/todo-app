import { FC } from 'react';
import { SortTaskType } from '../../enums';
import { useDropdown } from '../../hooks/useDropdown';

export const SortComponent: FC<{ requestSort: (event: any) => void }> = ({ requestSort }) => {
	const { elementeReference, toggleDropdown, dropdownOpen } = useDropdown();

	return (
		<div ref={elementeReference}>
			<button
				className='absolute right-4 top-0 bg-inherit border-none text-blue cursor-pointer p-4 hover:bg-llight-grey'
				onClick={toggleDropdown}>
				Sortuj
			</button>
			{dropdownOpen && (
				<div className='absolute right-4 top-12 z-10 bg-white w-[320px] h-[200px] shadow-sm'>
					<div className='flex flex-col items-center'>
						<span className='p-4 border-solid border-b-2 w-full text-center'>Sortuj według</span>
						<select onChange={requestSort} className='border-none outline-none text-sm p-4'>
							<option value={[SortTaskType.title, 'string']}>Alfabetycznie</option>
							<option value={[SortTaskType.createdAt, 'date']}>Data utworzenia</option>
							<option value={[SortTaskType.importance, 'string']}>Ważność</option>
							<option value={[SortTaskType.deadline, 'date']}>Termin wykonania</option>
						</select>
					</div>
				</div>
			)}
		</div>
	);
};
