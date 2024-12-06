import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useState } from 'react';
import logo from '../assets/diA.png';
// import { useSession } from '../hooks/sessionContext';
import { type TSectionProps } from '../types/componentTypes';

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
  // CustomerInformation 열림 닫힘
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex flex-col bg-white ${layoutClassName}`}>
      {/* 상단 */}
      <div
        className={`sticky top-0 w-full h-14 flex items-center justify-between bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg ${labelClassName}`}
      >
        <div className='w-full flex items-center'>
          {logoImg && (
            <img src={logo} alt='dIA logo' className='w-9 mr-4 rounded-full' />
          )}

          <span
            className='text-lg'
            style={{ fontFamily: 'hana-bold, sans-serif' }}
          >
            {title}
          </span>

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
                  onClick={() =>
                    setIsEditing &&
                    (setIsEditing(!isEditing), setIsCollapsed(false))
                  }
                >
                  EDIT
                </button>
              )}
            </>
          )}
        </div>
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
