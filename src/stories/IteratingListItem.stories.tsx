import { Meta, StoryObj } from '@storybook/react';
import IteratingListItem from '../components/IteratingListItem';

const meta: Meta<typeof IteratingListItem> = {
  title: 'Components/IteratingListItem',
  component: IteratingListItem,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    isSelected: { control: 'boolean' },
    onClick: { action: 'clicked' },
    date: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof IteratingListItem>;

export const Default: Story = {
  args: {
    title: '강재준 손님',
    content: '강남구 거주, 안정적 자산 관리 필요.',
    isSelected: false,
  },
};

export const WithDate: Story = {
  args: {
    title: '강재준 손님',
    content: '2023년 새해가 밝았습니다.',
    date: '2023.01.01',
  },
};
