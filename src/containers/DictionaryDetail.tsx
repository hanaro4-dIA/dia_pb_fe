import Section from '../components/Section';
import { TDictionaryDetailProps } from '../types/componentTypes';

export default function DictionaryDetail({
  selectedItem,
}: TDictionaryDetailProps) {
  return (
    <Section title='상세보기'>
      {selectedItem ? (
        <div className='h-full p-10 space-y-4 overflow-y-auto border-x border-b border-gray-200'>
          <div className='text-4xl font-bold'>{selectedItem.title}</div>
          <div className='flex gap-3 border-b border-black border-b-3 pb-2'>
            <div className='text-lg font-extrabold'>상세 URL</div>
            <div className='text-lg'>
              <a
                href={selectedItem.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 underline'
              >
                {selectedItem.url}
              </a>
            </div>
          </div>
          <div className='text-3xl font-bold'>내용</div>
          <div className='mt-4'>{selectedItem.content}</div>
        </div>
      ) : (
        <div className='p-10 space-y-4 border-x border-b border-gray-200 text-center text-hanaindigo text-xl h-full'>
          키워드를 선택해 주세요.
        </div>
      )}
    </Section>
  );
}
