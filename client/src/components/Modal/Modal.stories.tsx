import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal } from './Modal';
import 'tailwindcss/tailwind.css';

export default {
	title: 'Example/Modal',
	component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = args => (
	<div className='mt-10 w-[200px]'>
		<Modal {...args} />
	</div>
);

export const Regular = Template.bind({});
Regular.args = {
	title: 'Lista zostanie trwale usunieta',
};

export const Subtitle = Template.bind({});
Subtitle.args = {
	title: 'Lista zostanie trwale usunieta',
	children: 'Tej akcjie nie da się cofnąć! Jesteś pewien?',
};
