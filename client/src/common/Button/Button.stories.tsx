import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';
import 'tailwindcss/tailwind.css';
import '../../index.css';

export default {
	title: 'Example/Button',
	component: Button,
} as ComponentMeta<typeof Button>;

const PrimaryTemplate: ComponentStory<typeof Button> = args => <Button {...args} className='button-primary bg-blue' />;

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
	type: 'button',
	children: 'Button',
};

const SecondaryTemplate: ComponentStory<typeof Button> = args => <Button {...args} className='button-secondary bg-red' />;

export const Secondary = SecondaryTemplate.bind({});
Secondary.args = {
	type: 'button',
	children: 'Button',
};

const OutlineTemplate: ComponentStory<typeof Button> = args => <Button {...args} className='button-outline' />;

export const Outline = OutlineTemplate.bind({});
Outline.args = {
	type: 'button',
	children: 'Button',
};

const DisabledTemplate: ComponentStory<typeof Button> = args => <Button {...args} className='button-disable' />;

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
	disabled: true,
	type: 'button',
	children: 'Button',
};

export const TypeSubmit = PrimaryTemplate.bind({});
TypeSubmit.args = {
	type: 'submit',
	children: 'Button',
};
