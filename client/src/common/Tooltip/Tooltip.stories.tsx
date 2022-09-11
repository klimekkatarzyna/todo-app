import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tooltip } from './Tooltip';
import 'tailwindcss/tailwind.css';

export default {
	title: 'Example/Tooltip',
	component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = args => (
	<div className='mt-10 w-[200px]'>
		<Tooltip {...args} />
	</div>
);

export const Regular = Template.bind({});
Regular.args = {
	children: <span>{'Lorem ipsum'}</span>,
	position: 'right',
	text: 'tooltip text',
};
