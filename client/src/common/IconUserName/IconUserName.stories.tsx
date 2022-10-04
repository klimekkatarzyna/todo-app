import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconUserName } from './IconUserName';
import '../../index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default {
	title: 'Example/IconUserName',
	component: IconUserName,
} as ComponentMeta<typeof IconUserName>;

const Template: ComponentStory<typeof IconUserName> = args => (
	<QueryClientProvider client={queryClient}>
		<IconUserName {...args} />
	</QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
	userName: 'Jan Nowak',
	isFullNameVisible: false,
};

export const FullName = Template.bind({});
FullName.args = {
	userName: 'Jan Nowak',
	isFullNameVisible: true,
};
