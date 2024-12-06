import IteratingListItem from '../components/IteratingListItem';
import { SearchField } from '../components/SearchField';
import Section from '../components/Section';
import { type TDictionaryListProps } from '../types/componentTypes';

export default function DictionaryList({
  searchTerm,
  setSearchTerm,
  filteredDBList,
  selectedItem,
  setSelectedItem,
}: TDictionaryListProps) {
  return (
    <Section title='키워드 DB 목록' layoutClassName='h-full'>
      <div className='sticky top-0 z-10 w-full bg-white'>
        <SearchField
          placeholder='키워드 검색'
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <div className='p-4'>
        {filteredDBList.length > 0 ? (
          filteredDBList.map((item) => (
            <IteratingListItem
              id={item.id}
              title={item.title}
              content={item.content}
              isSelected={item.id === selectedItem?.id}
              onClick={() => setSelectedItem(item)}
            />
          ))
        ) : (
          <div className='text-center text-hanaindigo text-xl'>
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </Section>
  );
}
