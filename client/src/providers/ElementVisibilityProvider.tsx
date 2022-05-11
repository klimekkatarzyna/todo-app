import React, { createContext, FC, useCallback, useState } from 'react';
export interface ElementVisibilityContextType {
	onShow: () => void;
	onHide: () => void;
	isVisible: boolean;
}

export const ElementVisibilityContext = createContext<ElementVisibilityContextType>({} as ElementVisibilityContextType);

interface IElementVisibilityProvider {
	children: React.ReactNode;
}

export const ElementVisibilityProvider: FC<IElementVisibilityProvider> = ({ children }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const onShow = () => setIsVisible(true);

	const onHide = () => setIsVisible(false);

	return <ElementVisibilityContext.Provider value={{ isVisible, onShow, onHide }}>{children}</ElementVisibilityContext.Provider>;
};
