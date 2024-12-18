import { Meta, StoryObj } from '@storybook/react';
import { UpcomingConsultationItem } from '../components/ApprovedConsultationItem';

const meta: Meta<typeof UpcomingConsultationItem> = {
  title: 'Components/UpcomingConsultationItem',
  component: UpcomingConsultationItem,
  tags: ['autodocs'],
  parameters: {
    reactRouter: {
      routePath: '/consulting/:id',
      routeParams: { id: '1' },
    },
  },
  argTypes: {
    id: { control: 'number' },
    customer_id: { control: 'number' },
    title: { control: 'text' },
    hope_date: { control: 'text' },
    hope_time: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof UpcomingConsultationItem>;

export const Default: Story = {
  args: {
    id: 1,
    customer_id: 1,
    category_id: 2,
    title: '주택담보대출 금리 조정 상담',
    hope_date: '2024.10.25',
    hope_time: '13:00',
  },
};

export const isQuick: Story = {
  args: {
    id: 1,
    customer_id: 1,
    category_id: 1,
    hope_date: '2024.12.30',
    hope_time: '18:00',
  },
};
