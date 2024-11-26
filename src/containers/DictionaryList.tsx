import { SearchField } from '../components/SearchField';
import Section from '../components/Section';
import { type TDictionaryListProps } from '../lib/types';

export default function DictionaryList({
  searchTerm,
  setSearchTerm,
  filteredDBList,
  selectedItem,
  setSelectedItem,
}: TDictionaryListProps) {
  return (
    <Section title='키워드 DB 목록'>
      <div className='sticky top-0 z-10 w-full bg-white'>
        <SearchField
          placeholder='키워드 검색'
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <div className='p-4'>
        {filteredDBList.map((item) => (
          <div
            key={item.id}
            className='mb-4'
            onClick={() => setSelectedItem(item)}
          >
            <div
              className={`${item.id === selectedItem?.id ? 'border-2 border-hanaindigo' : 'border border-gray-200'} rounded-lg p-4 shadow-lg cursor-pointer`}
            >
              <div className='text-black text-base font-bold'>{item.title}</div>
              <div
                className={`${item.id === selectedItem?.id ? 'bg-hanagold/60' : 'bg-hanagold/40'} p-2 mt-2 rounded-lg`}
              >
                <div className='truncate w-full'>{item.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
