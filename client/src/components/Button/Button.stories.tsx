import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';
import 'tailwindcss/tailwind.css';

export default {
	title: 'Example/Button',
	component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	primary: true,
	type: 'button',
	children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
	secondary: true,
	type: 'button',
	children: 'Button',
};

export const Outline = Template.bind({});
Outline.args = {
	outline: true,
	type: 'button',
	children: 'Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true,
	type: 'button',
	children: 'Button',
};

export const TypeSubmit = Template.bind({});
TypeSubmit.args = {
	primary: true,
	type: 'submit',
	children: 'Button',
};
