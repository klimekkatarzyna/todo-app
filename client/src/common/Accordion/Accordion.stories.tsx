import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Accordion } from './Accordion';
import '../../index.css';

export default {
	title: 'Example/Accordion',
	component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = args => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: 'Accordion',
	children: <div>{'Element 1'}</div>,
};

export const WithDetails = Template.bind({});
WithDetails.args = {
	title: 'Accordion',
	details: <span className='ml-4'>1</span>,
	children: <div>{'Element 1'}</div>,
};
