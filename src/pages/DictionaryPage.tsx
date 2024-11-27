import { useEffect, useState } from 'react';
import { dbList } from '../../public/data/Dictionary';
import DictionaryDetail from '../containers/DictionaryDetail';
import DictionaryList from '../containers/DictionaryList';
import useDebounce from '../hooks/useDebounce';
import { type TDbItemProps } from '../types/dataTypes';

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedItem, setSelectedItem] = useState<TDbItemProps | undefined>();

  const [filteredDBList, setFilteredDBList] = useState<TDbItemProps[]>(dbList);

  useEffect(() => {
    const newFilteredList = dbList.filter(
      (item: TDbItemProps) =>
        item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredDBList(newFilteredList);
  }, [debouncedSearchTerm]);

  return (
    <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
      <div className='flex flex-col flex-grow w-1/4 h-full'>
        <div className='overflow-auto h-full'>
          <DictionaryList
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredDBList={filteredDBList}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>
      </div>
      <div className='flex flex-col flex-grow w-3/4 h-full'>
        <DictionaryDetail selectedItem={selectedItem} />
      </div>
    </div>
  );
}
