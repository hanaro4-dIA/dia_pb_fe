import { Meta, StoryObj } from '@storybook/react';
import { ApprovedConsultationItem } from '../components/ApprovedConsultationItem';

const meta: Meta<typeof ApprovedConsultationItem> = {
  title: 'Components/UpcomingConsultationItem',
  component: ApprovedConsultationItem,
  tags: ['autodocs'],
  parameters: {
    reactRouter: {
      routePath: '/consulting/:id',
      routeParams: { id: '1' },
    },
  },
  argTypes: {
    id: { control: 'number' },
    customerId: { control: 'number' },
    title: { control: 'text' },
    hopeDate: { control: 'text' },
    hopeTime: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ApprovedConsultationItem>;

export const Default: Story = {
  args: {
    id: 1,
    customerId: 1,
    categoryId: 2,
    title: '주택담보대출 금리 조정 상담',
    hopeDate: '2024.10.25',
    hopeTime: '13:00',
  },
};

export const isQuick: Story = {
  args: {
    id: 1,
    customerId: 1,
    categoryId: 1,
    hopeDate: '2024.12.30',
    hopeTime: '18:00',
  },
};
