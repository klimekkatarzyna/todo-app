import { AppColor } from '@kkrawczyk/todo-common';
import { createContext, FC, useEffect, useState } from 'react';

export interface IThemeContext {
	setTheme: React.Dispatch<React.SetStateAction<AppColor>>;
	theme: AppColor;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const defaultTheme = (sessionStorage.getItem('theme') as AppColor) || AppColor.dark;
	const [theme, setTheme] = useState<AppColor>(defaultTheme);

	useEffect(() => {
		sessionStorage.setItem('theme', theme);
	}, [theme]);

	const defaultContext = {
		theme,
		setTheme,
	};

	return <ThemeContext.Provider value={defaultContext}>{children}</ThemeContext.Provider>;
};
