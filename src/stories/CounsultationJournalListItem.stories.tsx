import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { ConsultationJournalListItem } from '../components/ConsultationJournalListItem';

const meta: Meta<typeof ConsultationJournalListItem> = {
  title: 'Components/ConsultationJournalListItem',
  component: ConsultationJournalListItem,
  tags: ['autodocs'],
  argTypes: {
    consultation: { control: 'object' },
    index: { control: 'number' },
    openNewWindow: { action: 'openNewWindow' },
  },
};

export default meta;
type Story = StoryObj<typeof ConsultationJournalListItem>;

const defaultConsultation = {
  id: 1,
  pbId: 1,
  pbName: '손흥민',
  customerId: 1,
  categoryId: 3,
  statusId: 1,
  consultTitle: '연금저축 상품 추천 상담',
  consultDate: '2024.10.25',
  contents: '상담 내용 예시',
  categoryName: '빠른 상담',
};

export const Default: Story = {
  args: {
    consultation: defaultConsultation,
    index: 0,
    openNewWindow: action('openNewWindow'),
  },
};

export const LongContent: Story = {
  args: {
    consultation: {
      ...defaultConsultation,
      consultTitle:
        '이것은 매우 긴 상담 제목입니다. truncate 기능을 테스트하기 위한 긴 텍스트입니다. 긴상담제목 긴상담제목 긴상담제목 긴상담제목 긴상담제목',
    },
    index: 1,
    openNewWindow: action('openNewWindow'),
  },
};
