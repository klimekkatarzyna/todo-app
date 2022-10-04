import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuListItem } from './MenuListItem';
import '../../index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppColor } from '@kkrawczyk/todo-common';
import { SideMenu } from '../../enums';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

export default {
	title: 'Example/MenuListItem',
	component: MenuListItem,
} as ComponentMeta<typeof MenuListItem>;

const Template: ComponentStory<typeof MenuListItem> = args => (
	<QueryClientProvider client={queryClient}>
		<RecoilRoot>
			<BrowserRouter>
				<MenuListItem {...args} />
			</BrowserRouter>
		</RecoilRoot>
	</QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
	listItem: {
		isMainList: false,
		title: 'Lista A',
		themeColor: AppColor.dark,
		createdAt: new Date(),
		url: '/',
	},
};

export const WithTheme = Template.bind({});
WithTheme.args = {
	listItem: {
		isMainList: false,
		title: 'Lista A',
		themeColor: AppColor.red,
		createdAt: new Date(),
		url: '/',
	},
};

export const SharedList = Template.bind({});
SharedList.args = {
	listItem: {
		isMainList: false,
		title: 'Lista A',
		themeColor: AppColor.dark,
		createdAt: new Date(),
		url: '/',
		members: ['2'],
	},
};

export const MainList = Template.bind({});
MainList.args = {
	listItem: {
		isMainList: true,
		title: 'Mój dzień',
		themeColor: AppColor.dark,
		createdAt: new Date(),
		url: `/${SideMenu.myDay}`,
	},
};
