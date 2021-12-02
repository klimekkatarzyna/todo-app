import React, { FC, useCallback, useState } from 'react';
import { ShowElementContext } from './ShowElementContext';

interface IShowElementProvider {
	children: React.ReactNode;
}

const ShowComponentProvider: FC<IShowElementProvider> = ({ children }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const onShowComponent = useCallback((): void => {
		setIsVisible(true);
	}, []);

	const onHideComponent = useCallback((): void => {
		setIsVisible(false);
	}, []);

	return (
		<ShowElementContext.Provider value={{ isVisible, onShowComponent, onHideComponent }}>
			{children}
		</ShowElementContext.Provider>
	);
};

export default ShowComponentProvider;
