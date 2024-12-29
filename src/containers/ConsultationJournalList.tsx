import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { ConsultationJournalListItem } from '../components/ConsultationJournalListItem';
import { SearchField } from '../components/SearchField';
import Section from '../components/Section';
import useDebounce from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';
import ReadJournalWindow from '../pages/ReadJournalWindow';
import { type TJournalsProps } from '../types/dataTypes';

export default function ConsultationJournalList({
  customerId,
}: {
  customerId: number;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // PB의 모든 상담일지 조회
  const { data: consultationData, error: consultationError } =
    useFetch<TJournalsProps[]>('journals');

  useEffect(() => {
    if (consultationError) {
      console.error('손님 한 명 정보 조회 중 발생한 에러: ', consultationError);
    }
  }, [consultationError]);

  // 한 손님의 모든 상담일지 조회
  const [customerJournalsListData, setCustomerJournalsListData] = useState<
    TJournalsProps[]
  >([]);

  useEffect(() => {
    if (consultationData) {
      const customerJournalsList = consultationData.filter(
        (consultation) => consultation.customerId === customerId
      );
      setCustomerJournalsListData(customerJournalsList);
    }
  }, [consultationData, customerId]);

  // 한 손님의 모든 상담일지 중 검색
  const filteredJournalsList = customerJournalsListData.filter(
    ({ consultTitle }) =>
      consultTitle &&
      consultTitle.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // 상담일지를 새 창에서 자세히 보기
  const openNewWindow = (consultation: TJournalsProps) => {
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    if (newWindow) {
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join('');
          } catch (error) {
            console.error(
              '상담일지를 새 창에서 자세히 보기에서 발생한 에러: ',
              error
            );
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
        root.render(<ReadJournalWindow consultation={consultation} />);
      }
    }
  };

  return (
    <Section title='상담일지 리스트' layoutClassName='h-full'>
      <div className='sticky top-0 z-10 w-full bg-white'>
        <SearchField
          placeholder='상담일지 검색'
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className='p-4'>
        {filteredJournalsList.length ? (
          filteredJournalsList.map((consultation, index) => {
            return (
              <ConsultationJournalListItem
                key={index}
                index={index + 1}
                consultation={consultation}
                openNewWindow={openNewWindow}
              />
            );
          })
        ) : (
          <div className='text-center text-hanaindigo text-sm'>
            상담 일지가 없습니다.
          </div>
        )}
      </div>
    </Section>
  );
}
