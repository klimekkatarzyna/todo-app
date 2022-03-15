import React, { useCallback, useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
	const elementeReference = useRef<HTMLDivElement>(null);
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const dropdown = elementeReference.current;
			if (!dropdown?.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, []);

	const toggleDropdown = useCallback(() => {
		setDropdownOpen(!dropdownOpen);
	}, [dropdownOpen]);

	return {
		elementeReference,
		dropdownOpen,
		toggleDropdown,
	};
};
