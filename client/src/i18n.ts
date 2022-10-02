import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './translations/pl.json';

const resources = {
	pl: {
		translation: pl,
	},
} as const;

i18n.use(initReactI18next).init({
	resources,
	lng: 'pl',

	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
