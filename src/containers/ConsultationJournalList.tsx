import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ConsultationJournalListItem } from '../components/ConsultationJournalListItem';
import { SearchField } from '../components/SearchField';
import Section from '../components/Section';
import useDebounce from '../hooks/useDebounce';
import ReadJournalWindow from '../pages/ReadJournalWindow';
import useFetch from '../hooks/useFetch';
import { type TJournalsProps } from '../types/dataTypes';
import { createRoot } from 'react-dom/client';

export default function ConsultationJournalList() {
  // URL에서 id 파라미터를 가져옴
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 디바운싱 처리된 검색어

  // 상담일지 데이터를 가져오는 useFetch 훅
  const { data: consultationData, error: consultationError } = useFetch<TJournalsProps[]>('pb/journals');
  console.error(consultationError);
  
  // 상담일지 데이터를 상태로 관리
  const [filteredConsultationData, setConsultationData] = useState<TJournalsProps[]>([]);

  useEffect(() => {
  if (consultationData) {
    const filteredData = consultationData.filter(
      (consultation) => consultation.customerId === Number(id)
    );
    setConsultationData(filteredData); // 상태 업데이트
  }
  
}, [consultationData, id]);
  // 상담일지 검색
  const filteredJournal = filteredConsultationData.filter(
    ({ consultTitle }) =>
      consultTitle && consultTitle.includes(debouncedSearchTerm) // title이 존재할 때만 includes 실행
  );
  // 상담일지를 새 창에서 자세히 보기
  const openNewWindow = (consultation: TJournalsProps) => {
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    if (newWindow) {
      // 현재 페이지의 스타일을 새 창에 적용
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join('');
          } catch (e) {
            console.error('Failed to load some CSS rules:');
            return '';
          }
        })
        .join('');

      newWindow.document.write(`
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>상담일지 자세히보기</title>
            <style>${styles}</style>
          </head>
          <body>
            <div id="journal-root"></div>
          </body>
        </html>
      `);
      newWindow.document.close();

      const rootElement = newWindow.document.getElementById('journal-root');
      if (rootElement) {
        const root = createRoot(rootElement);
        root.render(<ReadJournalWindow consultation={consultation} />); // 새 창에서 상담일지 보기
      }
    }
  };

  
  return (
    <Section title='상담일지 리스트' layoutClassName='h-full'>
      <div className='sticky top-0 z-10 w-full bg-white'>
        {/* 검색창 */}
        <SearchField
          placeholder='상담일지 검색'
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      
      <div className='p-4'>
        {/* 필터링된 상담일지를 표시 */}
        {filteredJournal.length ? (
          filteredJournal.map((consultation, index) => {
            return (
              <ConsultationJournalListItem
                key={index}
                index={index+1}
                consultation={consultation}
                openNewWindow={openNewWindow}
              />
            );
          })
        ) : (
          <div className='text-center text-hanaindigo text-xl'>
            상담 일지가 없습니다.
          </div>
        )}
      </div>
    </Section>
  );
}
