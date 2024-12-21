import Section from '../components/Section';
import { type TDictionaryDetailProps } from '../types/componentTypes';

export default function DictionaryDetail({
  selectedItem,
}: TDictionaryDetailProps) {
  return (
    <Section title='상세보기' layoutClassName='h-full'>
      {selectedItem ? (
        <div className='h-full p-10 space-y-4 overflow-y-auto border-x border-b border-gray-200'>
          <div className='text-right text-xs'>
            ( 출처:{' '}
            <a
              className='underline underline-offset-4'
              target='_blank'
              href='https://fine.fss.or.kr/fine/fnctip/fncDicary/list.do?menuNo=900021&pageIndex=54&src=&kind=&searchCnd=1&searchStr='
            >
              금융소비자 정보포털 파인 FINE 금융용어사전
            </a>{' '}
            )
          </div>
          <div
            className='text-4xl'
            style={{ fontFamily: 'noto-bold, sans-serif' }}
          >
            {selectedItem.title}
          </div>
          <div className='flex gap-3 border-b border-gray-300 border-b-3 pb-2'></div>
          <div
            className='text-xl'
            style={{ fontFamily: 'noto-bold, sans-serif' }}
          >
            내용
          </div>

          <div className='mt-4 leading-relaxed'>{selectedItem.content}</div>
        </div>
      ) : (
        <div className='p-10 space-y-4 border-x border-b border-gray-200 text-center text-hanaindigo text-sm h-full'>
          키워드를 선택해 주세요.
        </div>
      )}
    </Section>
  );
}
