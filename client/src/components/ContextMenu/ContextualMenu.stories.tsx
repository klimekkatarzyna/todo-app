import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContextMenuComponent } from './ContextMenuComponent';
import 'tailwindcss/tailwind.css';
import { contextualMenuSecountOpion } from '../../constants';

export default {
	title: 'Example/ContextMenuComponent',
	component: ContextMenuComponent,
} as ComponentMeta<typeof ContextMenuComponent>;

const Template: ComponentStory<typeof ContextMenuComponent> = args => <ContextMenuComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
	contextMenuList: contextualMenuSecountOpion,
	elementDetails: undefined,
};
