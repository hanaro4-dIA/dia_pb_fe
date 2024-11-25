import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { ReactNode, useState } from 'react';
import logo from '../assets/diA.png';

type TSectionProps = {
  pbProfile?: boolean;
  logoImg?: boolean;
  title: string;
  arrowToggle?: boolean;
  children: ReactNode;
  layoutClassName?: string;
  labelClassName?: string;
  contentClassName?: string;
  isEditing?: boolean;
  setIsEditing?: (editing: boolean) => void;
  handleSubmit?: () => void;
};

export default function Section({
  pbProfile,
  logoImg,
  title,
  arrowToggle,
  children,
  layoutClassName = '',
  labelClassName = '',
  contentClassName = '',
  isEditing = false,
  setIsEditing,
  handleSubmit,
}: TSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogoutEvent = () => {
    alert('로그아웃되었습니다.');
  };

  return (
    <div className={`flex flex-col h-full bg-white ${layoutClassName}`}>
      {/* 상단 */}
      <div
        className={`sticky top-0 w-full h-14 flex items-center justify-between bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg ${labelClassName}`}
      >
        <div className='w-full flex items-center'>
          {logoImg && (
            <img src={logo} alt='dIA logo' className='w-8 mr-4 rounded-full' />
          )}

          <span>{title}</span>

          {pbProfile && (
            <>
              {isEditing ? (
                <button
                  className='text-sm text-green-600 ml-3'
                  onClick={handleSubmit}
                >
                  저장
                </button>
              ) : (
                <button
                  className='text-sm text-red-600 ml-3'
                  onClick={() => setIsEditing && setIsEditing(!isEditing)}
                >
                  EDIT
                </button>
              )}
            </>
          )}
        </div>
        {pbProfile && (
          <button
            onClick={handleLogoutEvent}
            className='w-20 text-white text-xs font-bold border border-white rounded px-2 py-1'
          >
            로그아웃
          </button>
        )}
        {arrowToggle && (
          <button onClick={toggleCollapse} className='text-white'>
            {isCollapsed ? (
              <MdKeyboardArrowDown size={24} />
            ) : (
              <MdKeyboardArrowUp size={24} />
            )}
          </button>
        )}
      </div>

      {/* 하단 */}
      {(!arrowToggle || !isCollapsed) && (
        <div
          className={`flex-grow overflow-y-auto border-x border-b border-gray-200 ${contentClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
