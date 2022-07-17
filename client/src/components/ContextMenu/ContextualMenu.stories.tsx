import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContextMenuComponent } from './ContextMenuComponent';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { contextualMenuSecountOpion } from '../../constants';
import { AppColor, IList } from '@kkrawczyk/todo-common';

const queryClient = new QueryClient();

const items = [
	{
		isMainList: false,
		title: 'Task 1',
		themeColor: AppColor.blue,
		_id: '1',
		createdAt: new Date(),
		url: '/',
	},
];

export default {
	title: 'Example/ContextMenuComponent',
	component: ContextMenuComponent,
} as ComponentMeta<typeof ContextMenuComponent>;

const Template: ComponentStory<typeof ContextMenuComponent> = args => <ContextMenuComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
	contextMenuList: contextualMenuSecountOpion,
	elementDetails: undefined,
};
