import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from './Checkbox';
import '../../index.css';

export default {
	title: 'Example/Checkbox',
	component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = args => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: 'Checkbox',
	tooltipText: 'oznacz jako wykonane',
	color: 'blue',
};

export const Checked = Template.bind({});
Checked.args = {
	checked: true,
	tooltipText: 'oznacz jako niewykonane',
	children: 'Checkbox',
	color: 'red',
};
