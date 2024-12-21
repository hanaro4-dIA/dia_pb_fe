import IteratingListItem from '../components/IteratingListItem';
import { SearchField } from '../components/SearchField';
import Section from '../components/Section';
import { TDictionaryListProps } from '../types/componentTypes';

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
        {filteredDBList?.length ? (
          filteredDBList.map((item) => (
            <IteratingListItem
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              isSelected={item.id === selectedItem?.id}
              onClick={() => setSelectedItem(item)}
            />
          ))
        ) : (
          <div className='text-center text-hanaindigo text-sm'>
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </Section>
  );
}
