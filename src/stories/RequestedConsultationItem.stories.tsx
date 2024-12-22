import { Meta, StoryObj } from '@storybook/react';
import { RequestedConsultationItem } from '../components/RequestedConsultationItem';

const meta: Meta<typeof RequestedConsultationItem> = {
  title: 'Components/RequestedConsultationItem',
  component: RequestedConsultationItem,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'number' },
    customerId: { control: 'number' },
    categoryId: { control: 'number' },
    title: { control: 'text' },
    hopeDate: { control: 'text' },
    hopeTime: { control: 'text' },
    reserveDate: { control: 'text' },
    reserveTime: { control: 'text' },
    approve: { control: 'boolean' },
    onApprove: { control: 'check' },
  },
};

export default meta;
type Story = StoryObj<typeof RequestedConsultationItem>;

export const Default: Story = {
  args: {
    id: 1,
    customerId: 1,
    categoryId: 2,
    title: '주택담보대출 금리 조정 상담',
    hopeDate: '2024.10.25',
    hopeTime: '13:00',
    reserveDate: '2024.10.20',
    reserveTime: '10:00',
    approve: true,
  },
};

export const isQuick: Story = {
  args: {
    id: 1,
    customerId: 1,
    categoryId: 1,
    hopeDate: '2024.12.30',
    hopeTime: '16:00',
    reserveDate: '2024.10.30',
    reserveTime: '16:00',
    approve: true,
  },
};
