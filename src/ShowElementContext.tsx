import { createContext } from 'react';

export interface ShowElementContextType {
	onShowComponent: () => void;
	onHideComponent: () => void;
	isVisible: boolean;
}

export const ShowElementContext = createContext<ShowElementContextType>({} as ShowElementContextType);
