import React, { useState, useEffect, useCallback } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import NavigationBtnImage1 from '../assets/NavigationBtn1.png';
import NavigationBtnImage2 from '../assets/NavigationBtn2.png';
import { FiHome } from "react-icons/fi";
import { MdMenuBook, MdOutlineMessage } from "react-icons/md";

const BUTTON_SIZE = 80;
const DRAG_THRESHOLD = 5;

type Bounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

type Position = {
  x: number;
  y: number;
};

const NavigationBtn: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<Bounds>({ left: 0, top: 0, right: 0, bottom: 0 });
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

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    if (Math.abs(data.x - position.x) > DRAG_THRESHOLD || Math.abs(data.y - position.y) > DRAG_THRESHOLD) {
      setHasMoved(true);
    }
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setIsDragging(false);
    const { x, y } = data;
    const newPosition = snapToEdge(x, y);
    setPosition(newPosition);
    setIsSubButtonsOnTop(newPosition.y > window.innerHeight / 2);
  };

  const snapToEdge = (x: number, y: number): Position => {
    const { left, top, right, bottom } = bounds;
    const distances = [
      { edge: 'left', distance: x - left },
      { edge: 'right', distance: right - x },
      { edge: 'top', distance: y - top },
      { edge: 'bottom', distance: bottom - y },
    ];
    const closestEdge = distances.reduce((min, curr) => curr.distance < min.distance ? curr : min);
    
    switch (closestEdge.edge) {
      case 'left': return { x: left, y };
      case 'right': return { x: right, y };
      case 'top': return { x, y: top };
      case 'bottom': return { x, y: bottom };
      default: return { x, y };
    }
  };

  const handleSubButtonClick = (path: string, target?: string) => {
    if (target === '_blank') {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
    setIsExpanded(false);
  };

  const subButtons = [
    { path: '/notification', icon: <MdOutlineMessage />, color: 'bg-violet-500 hover:bg-violet-800' },
    { path: '/dictionary', target:'_blank', icon: <MdMenuBook />, color: 'bg-orange-500 hover:bg-orange-800' },
    { path: '/', icon: <FiHome />, color: 'bg-red-500 hover:bg-red-800' },
  ];

  return (
    <Draggable
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
      bounds={bounds}
      position={position}
    >
      <div className="fixed" style={{ zIndex: 1000 }}>
        {isExpanded && (
          <div className={`absolute ${isSubButtonsOnTop ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 transform -translate-x-1/2 space-y-2 transition-all duration-300`}>
            {subButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleSubButtonClick(button.path, button.target)}
                className={`w-12 h-12 rounded-full ${button.color} text-white text-lg flex items-center justify-center shadow-md transition-all duration-300`}
              >
                {button.icon}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={handleMainButtonClick}
          className="w-20 h-20 rounded-full bg-white border-2 border-hanagreen hover:bg-hanagreen text-white text-xl flex items-center justify-center shadow-md transition-all duration-300 relative"
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