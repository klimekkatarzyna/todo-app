import React, { createContext, FC, useCallback, useState } from 'react';
export interface ModalVisibilityContextType {
	onShow: () => void;
	onHide: () => void;
	isVisible: boolean;
}

export const ModalVisibilityContext = createContext<ModalVisibilityContextType>({} as ModalVisibilityContextType);

interface IModalVisibilityProvider {
	children: React.ReactNode;
}

export const ModalVisibilityProvider: FC<IModalVisibilityProvider> = ({ children }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const onShow = () => setIsVisible(true);

	const onHide = () => setIsVisible(false);

	return <ModalVisibilityContext.Provider value={{ isVisible, onShow, onHide }}>{children}</ModalVisibilityContext.Provider>;
};
