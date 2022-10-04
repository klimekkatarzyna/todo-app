import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RegularModal } from './RegularModal';
import 'tailwindcss/tailwind.css';
import { RecoilRoot } from 'recoil';

export default {
	title: 'Example/Modal',
	component: RegularModal,
} as ComponentMeta<typeof RegularModal>;

const Template: ComponentStory<typeof RegularModal> = args => (
	<RecoilRoot>
		<div className='mt-10 w-[200px]'>
			<RegularModal {...args} />
		</div>
	</RecoilRoot>
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
