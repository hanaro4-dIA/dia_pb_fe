import { Meta, StoryObj } from '@storybook/react';
import NavigationBtn from '../components/NavigationBtn';
import { SessionContext } from '../hooks/sessionContext';

// useNavigate 모킹
const mockUseNavigate = () => jest.fn();

// 모킹된 세션 컨텍스트 값
const mockSessionContext = {
  user: null,
  handleLoginEvent: () => console.log('Login clicked'),
  handleLogoutEvent: () => console.log('Logout clicked'),
};

const meta: Meta<typeof NavigationBtn> = {
  title: 'Components/NavigationBtn',
  component: NavigationBtn,
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
};

export default meta;
type Story = StoryObj<typeof NavigationBtn>;

export const Default: Story = {};
