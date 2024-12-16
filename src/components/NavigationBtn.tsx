import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { FiHome } from 'react-icons/fi';
import { MdMenuBook, MdOutlineMessage } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import NavigationBtnImage1 from '../assets/NavigationBtn1.png';
import NavigationBtnImage2 from '../assets/NavigationBtn2.png';
import { useSession } from '../hooks/sessionContext';
import { type TSubButtonProp } from '../types/componentTypes';

const BUTTON_SIZE = 80;
const DRAG_THRESHOLD = 5;

type TBoundsProps = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

type TPositionProps = {
  x: number;
  y: number;
};

const NavigationBtn = () => {
  const { handleLogoutEvent } = useSession();
  const [_, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState<TPositionProps>({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<TBoundsProps>({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const [isSubButtonsOnTop, setIsSubButtonsOnTop] = useState(true);
  const navigate = useNavigate();

  const updatePositionAndBounds = useCallback(() => {
    const newBounds = {
      left: 0,
      top: 0,
      right: window.innerWidth - BUTTON_SIZE,
      bottom: window.innerHeight - BUTTON_SIZE,
    };
    setBounds(newBounds);
    setPosition({ x: newBounds.right, y: newBounds.bottom });
  }, []);

  useEffect(() => {
    updatePositionAndBounds();
    window.addEventListener('resize', updatePositionAndBounds);
    return () => window.removeEventListener('resize', updatePositionAndBounds);
  }, [updatePositionAndBounds]);

  const handleMainButtonClick = () => {
    if (!hasMoved) {
      setIsExpanded(!isExpanded);
      setIsSubButtonsOnTop(position.y > window.innerHeight / 2);
    }
    setHasMoved(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setHasMoved(false);
  };

  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    if (
      Math.abs(data.x - position.x) > DRAG_THRESHOLD ||
      Math.abs(data.y - position.y) > DRAG_THRESHOLD
    ) {
      setHasMoved(true);
    }
  };

  const handleDragStop = (_: DraggableEvent, data: DraggableData) => {
    setIsDragging(false);
    const { x, y } = data;
    const newPosition = snapToEdge(x, y);
    setPosition(newPosition);
    setIsSubButtonsOnTop(newPosition.y > window.innerHeight / 2);
  };

  const snapToEdge = (x: number, y: number): TPositionProps => {
    const { left, top, right, bottom } = bounds;

    const distances = [
      { edge: 'left', distance: x - left },
      { edge: 'right', distance: right - x },
      { edge: 'top', distance: y - top },
      { edge: 'bottom', distance: bottom - y },
    ];

    const closestEdge = distances.reduce((min, curr) =>
      curr.distance < min.distance ? curr : min
    );

    switch (closestEdge.edge) {
      case 'left':
        return { x: left, y };
      case 'right':
        return { x: right, y };
      case 'top':
        return { x, y: top };
      case 'bottom':
        return { x, y: bottom };
      default:
        return { x, y };
    }
  };

  const handleSubButtonClick = (button: TSubButtonProp) => {
    if (button.onClick) {
      button.onClick();
    } else if (button.path) {
      if (button.target === '_blank') {
        window.open(button.path, '_blank', 'noopener,noreferrer');
      } else {
        navigate(button.path);
      }
    }
    setIsExpanded(false);
  };

  const subButtons: TSubButtonProp[] = [
    {
      icon: <RiLogoutBoxRLine />,
      color: 'bg-green-600 hover:bg-green-800',
      title: '로그아웃',
      onClick: handleLogoutEvent,
    },
    {
      icon: <MdOutlineMessage />,
      color: 'bg-violet-500 hover:bg-violet-800',
      title: '쪽지',
      path: '/notification',
    },
    {
      target: '_blank',
      icon: <MdMenuBook />,
      color: 'bg-orange-500 hover:bg-orange-800',
      title: '사전',
      path: '/dictionary',
    },
    {
      icon: <FiHome />,
      color: 'bg-red-500 hover:bg-red-800',
      title: '홈',
      path: '/',
    },
  ];

  return (
    <Draggable
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
      bounds={bounds}
      position={position}
    >
      <div className='fixed' style={{ zIndex: 1000 }}>
        {isExpanded && (
          <div
            className={`absolute ${isSubButtonsOnTop ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 transform -translate-x-1/2 space-y-2 transition-all duration-300`}
          >
            {subButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleSubButtonClick(button)}
                className={`w-12 h-12 rounded-full ${button.color} text-white text-lg flex items-center justify-center shadow-md transition-all duration-300`}
                title={button.title}
              >
                {button.icon}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={handleMainButtonClick}
          className='w-20 h-20 rounded-full bg-white border-2 border-hanagreen hover:bg-hanagreen text-white text-xl flex items-center justify-center shadow-md transition-all duration-300 relative'
          style={{
            cursor: 'pointer',
            backgroundImage: `url(${isExpanded ? NavigationBtnImage2 : NavigationBtnImage1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
    </Draggable>
  );
};

export default NavigationBtn;
