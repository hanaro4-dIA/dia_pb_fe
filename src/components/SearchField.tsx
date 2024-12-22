import { IoMdSearch } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';

type TSearchField = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export const SearchField = ({ placeholder, value, onChange }: TSearchField) => {
  // 검색 기록 한번에 삭제
  const deleteInputAllEvent = () => {
    onChange('');
  };

  return (
    <div className='w-full flex justify-center py-4'>
      <div className='relative w-11/12'>
        <input
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='w-full h-10 bg-white/60 rounded-lg border border-hanaindigo pl-4 focus:ring-2 focus:ring-inset focus:ring-hanasilver focus:outline-none'
        />
        {value ? (
          <TiDeleteOutline
            onClick={deleteInputAllEvent}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 text-hanaindigo'
          />
        ) : (
          <IoMdSearch className='absolute right-4 top-1/2 transform -translate-y-1/2 text-hanaindigo' />
        )}
      </div>
    </div>
  );
};
