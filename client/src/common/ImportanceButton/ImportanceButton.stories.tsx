import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImportanceButton } from './ImportanceButton';
import '../../index.css';

export default {
	title: 'Example/ImportanceButton',
	component: ImportanceButton,
} as ComponentMeta<typeof ImportanceButton>;

const Template: ComponentStory<typeof ImportanceButton> = args => (
	<div className='m-4'>
		{' '}
		<ImportanceButton {...args} />
	</div>
);

export const Default = Template.bind({});
Default.args = {
	isChecked: false,
};

export const Important = Template.bind({});
Important.args = {
	isChecked: true,
};
