import { Meta, StoryObj } from '@storybook/react';
import { RequestedConsultationItem } from '../components/RequestedConsultationItem';
import { TConsultationProps } from '../types/dataTypes';

const meta: Meta<typeof RequestedConsultationItem> = {
  title: 'Components/RequestedConsultationItem',
  component: RequestedConsultationItem,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RequestedConsultationItem>;

const defaultConsultation: TConsultationProps = {
  id: 1,
  customerId: 1,
  customerName: '손흥민',
  categoryId: 2,
  title: '주택담보대출 금리 조정 상담',
  content: '고민입니다. 도와주세요~',
  hopeDate: '2024.12.31',
  hopeTime: '13:00',
  reserveDate: '2024.10.20',
  reserveTime: '10:00',
  approve: true,
};

const quickConsultation: TConsultationProps = {
  id: 1,
  customerId: 1,
  customerName: '안유진',
  categoryId: 1,
  title: '빠른상담',
  content: '',
  hopeDate: '2024.12.30',
  hopeTime: '15:00',
  reserveDate: '2024.12.30',
  reserveTime: '15:00',
  approve: true,
};

export const Default: Story = {
  args: {
    consultation: defaultConsultation,
    setApprove: () => console.log('setApprove called'),
    onApprove: (id: string) => console.log(`onApprove called with id: ${id}`),
  },
};

export const isQuick: Story = {
  args: {
    consultation: quickConsultation,
    setApprove: () => console.log('setApprove called'),
    onApprove: (id: string) => console.log(`onApprove called with id: ${id}`),
  },
};
