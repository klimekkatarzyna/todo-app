import { createContext, FC, useState } from 'react';
import { AppColorType } from '../enums';

export interface IThemeContext {
	setTheme: React.Dispatch<React.SetStateAction<AppColorType>>;
	theme: AppColorType;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

interface IThemeProvider {
	children: React.ReactNode;
}

export const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
	const [theme, setTheme] = useState<AppColorType>('blue');

	const defaultContext = {
		theme,
		setTheme,
	};

	return <ThemeContext.Provider value={defaultContext}>{children}</ThemeContext.Provider>;
};
