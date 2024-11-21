import { IoMdSearch } from 'react-icons/io';

type TSearchField = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export const SearchField = ({ placeholder, value, onChange }: TSearchField) => {
  return (
    <div className='flex justify-center mt-4'>
      <div className='relative w-11/12'>
        <input
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='w-full h-[2.5rem] bg-white/60 rounded-lg border border-hanaindigo pl-4 focus:ring-2 focus:ring-inset focus:ring-hanasilver focus:outline-none'
        />
        <IoMdSearch className='absolute right-4 top-1/2 transform -translate-y-1/2 text-hanaindigo' />
      </div>
    </div>
  );
};
