type TIteratingListItem = {
  id: number;
  title: string;
  content: string;
  isSelected?: boolean;
  onClick: () => void;
  date?: string;
};

const IteratingListItem = ({
  id,
  title,
  content,
  isSelected,
  onClick,
  date,
}: TIteratingListItem) => (
  <div
    key={id}
    className={`mb-4 ${isSelected ? 'border-2 border-hanaindigo' : 'border border-gray-200'} rounded-lg p-4 shadow-lg cursor-pointer`}
    onClick={onClick}
  >
    <div className='flex justify-between items-center mb-2 text-sm'>
      <span className='text-lg font-bold'>{title}</span>
      {date && <span>{date}</span>}
    </div>
    <div
      className={`${isSelected ? 'bg-hanagold/60' : 'bg-hanagold/40'} text-black p-2 mt-2 rounded-lg`}
    >
      <div className='truncate'>{content}</div>
    </div>
  </div>
);

export default IteratingListItem;
