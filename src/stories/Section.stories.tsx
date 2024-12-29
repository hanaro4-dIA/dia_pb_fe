import { Meta, StoryObj } from '@storybook/react';
import Section from '../components/Section';
import { SessionContext } from '../hooks/sessionContext';

// useNavigate 모킹
const mockUseNavigate = () => jest.fn();

// 모킹된 세션 컨텍스트 값
const mockSessionContext = {
  user: null,
  handleLoginEvent: () => console.log('Login clicked'),
  handleLogoutEvent: () => console.log('Logout clicked'),
};

const meta: Meta<typeof Section> = {
  title: 'Components/Section',
  component: Section,
  tags: ['autodocks'],
  decorators: [
    (Story) => (
      <SessionContext.Provider value={mockSessionContext}>
        <div style={{ height: '100vh', position: 'relative' }}>
          <Story />
        </div>
      </SessionContext.Provider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    reactRouter: {
      routePath: '/',
      useNavigate: mockUseNavigate,
    },
  },
  argTypes: {
    pbProfile: { control: 'boolean' },
    logoImg: { control: 'boolean' },
    title: { control: 'text' },
    arrowToggle: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    title: '손님 목록',
  },
};

export const withToggle: Story = {
  args: {
    title: '손님 정보',
    arrowToggle: true,
  },
};

export const isPbProfile: Story = {
  args: {
    pbProfile: true,
    title: '내 프로필',
    arrowToggle: true,
  },
};

export const withLogoAndToggle: Story = {
  args: {
    logoImg: true,
    title: '전체 상담 일정',
    arrowToggle: true,
  },
};
