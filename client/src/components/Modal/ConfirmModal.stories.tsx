import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConfirmModal } from './ConfirmModal';
import 'tailwindcss/tailwind.css';
import { RecoilRoot } from 'recoil';

export default {
	title: 'Example/Modal',
	component: ConfirmModal,
} as ComponentMeta<typeof ConfirmModal>;

const Template: ComponentStory<typeof ConfirmModal> = args => (
	<RecoilRoot>
		<div className='mt-10 w-[200px]'>
			<ConfirmModal {...args} />
		</div>
	</RecoilRoot>
);

export const ConfirmModalComponent = Template.bind({});
ConfirmModalComponent.args = {
	title: 'Lista zostanie trwale usunieta',
	children: 'Tej akcjie nie da się cofnąć! Jesteś pewien?',
};
