import { type TIteratingListItem } from '../types/componentTypes';
import changeDateFormat from '../utils/changeDateFormat-util';

const IteratingListItem = ({
  title,
  content,
  isSelected,
  onClick,
  date,
}: TIteratingListItem) => (
  <div
    className={`mb-4 ${isSelected ? 'border-2 border-hanaindigo' : 'border border-gray-200'} rounded-lg p-4 shadow-lg cursor-pointer`}
    onClick={onClick}
  >
    <div className='flex justify-between items-center mb-2 text-sm'>
      <span className='font-semibold text-base'>{title}</span>
      {date && <span>{changeDateFormat(date)}</span>}
    </div>
    <div
      className={`${isSelected ? 'bg-hanagold/60' : 'bg-hanagold/40'} text-black p-2 mt-2 rounded-lg`}
    >
      <div className='truncate text-sm' title={content}>
        {content}
      </div>
    </div>
  </div>
);

export default IteratingListItem;
