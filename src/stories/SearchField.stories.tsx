import { Meta, StoryObj } from '@storybook/react';
import { SearchField } from '../components/SearchField';

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = {
  args: {
    placeholder: '검색어를 입력하세요.',
    value: '',
  },
};

export const deleteInput: Story = {
  args: {
    placeholder: '검색어를 입력하세요.',
    value: '우측 삭제 버튼 클릭 시 검색어 한번에 삭제',
  },
};
