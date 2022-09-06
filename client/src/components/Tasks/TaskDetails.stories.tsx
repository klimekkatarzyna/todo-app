import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TaskDetails } from './TaskDetails';
import 'tailwindcss/tailwind.css';
import { AppColor, Importance, ITaskStatus } from '@kkrawczyk/todo-common';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

export default {
	title: 'Example/TaskDetails',
	component: TaskDetails,
} as ComponentMeta<typeof TaskDetails>;

const Template: ComponentStory<typeof TaskDetails> = args => (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<div className='flex flex-row items-center'>
				<TaskDetails {...args} />
			</div>
		</BrowserRouter>
	</QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
	taskData: {
		importance: Importance.normal,
		parentFolderId: '1',
		title: 'Title',
		themeColor: AppColor.grey,
		_id: '2',
		taskStatus: ITaskStatus.unComplete,
	},
};

export const WithGroup = Template.bind({});
WithGroup.args = {
	taskData: {
		importance: Importance.normal,
		parentFolderId: '1',
		groupName: 'group name',
		title: 'Title',
		themeColor: AppColor.grey,
		_id: '2',
		taskStatus: ITaskStatus.unComplete,
	},
};

export const ImportanceType = Template.bind({});
ImportanceType.args = {
	taskData: {
		importance: Importance.high,
		parentFolderId: '1',
		groupName: 'group name',
		title: 'Title',
		themeColor: AppColor.grey,
		_id: '2',
		taskStatus: ITaskStatus.unComplete,
	},
};

export const CompleteTask = Template.bind({});
CompleteTask.args = {
	taskData: {
		importance: Importance.high,
		parentFolderId: '1',
		groupName: 'group name',
		title: 'Title',
		themeColor: AppColor.dark,
		_id: '2',
		taskStatus: ITaskStatus.complete,
	},
};

export const WithTheme = Template.bind({});
WithTheme.args = {
	taskData: {
		importance: Importance.high,
		parentFolderId: '1',
		groupName: 'group name',
		title: 'Title',
		themeColor: AppColor.green,
		_id: '2',
		taskStatus: ITaskStatus.unComplete,
	},
};
