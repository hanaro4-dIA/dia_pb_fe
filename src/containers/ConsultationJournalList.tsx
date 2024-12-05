import { createRoot } from 'react-dom/client';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ConsultationJournalListItem } from '../components/ConsultationJournalListItem';
import { SearchField } from '../components/SearchField';
import Section from '../components/Section';
import useDebounce from '../hooks/useDebounce';
import ReadJournalWindow from '../pages/ReadJournalWindow';
import { type TPbProps } from '../types/dataTypes';
import { type TJournalsProps } from '../types/dataTypes';

export default function ConsultationJournalList() {
  const { id } = useParams();
  const [consultationJourData, setConsultationJourData] = useState<
    (TJournalsProps & { pbName: string })[]
  >([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchPBName = async (pbId: number): Promise<string> => {
    try {
      const response = await fetch('/data/PB.json');
      const pbData = await response.json();
      const pb = pbData.find((pb: TPbProps) => pb.id === pbId);

      return pb ? pb.name : 'PB 이름 없음';
    } catch (error) {
      alert('Error fetching PB data:');
      return 'PB 이름 없음';
    }
  };

  const fetchConsultationData = async () => {
    try {
      const response = await fetch('/data/Journals.json');
      const data: TJournalsProps[] = await response.json();

      const filteredData = await Promise.all(
        data
          .filter((consultation) => consultation.customer_id === Number(id))
          .map(async (consultation) => {
            const pbName = await fetchPBName(consultation.pb_id);
            return { ...consultation, pbName };
          })
      );

      setConsultationJourData(filteredData);
    } catch (error) {
      alert('Error fetching consultation data:');
    }
  };

  useEffect(() => {
    if (id !== null) {
      fetchConsultationData();
    }
  }, [id]);

  // 상담일지 검색하기
  const filteredJournal = consultationJourData.filter(
    ({ title, content }) =>
      title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      content.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // 상담일지 자세히보기
  const openNewWindow = (consultation: TJournalsProps & { pbName: string }) => {
    const newWindow = window.open('', '_blank', 'width=800,height=600');

    if (newWindow) {
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join('');
          } catch (e) {
            alert('Failed to load some CSS rules:');
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
    <Section title='상담일지 리스트'>
      <div className='sticky top-0 z-10 w-full bg-white'>
        <SearchField
          placeholder='상담일지 검색'
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className='p-4'>
        {filteredJournal.length > 0 ? (
          filteredJournal.map((consultation, index) => (
            <ConsultationJournalListItem
              key={index}
              index={consultation.id || index}
              consultation={consultation}
              openNewWindow={openNewWindow}
            />
          ))
        ) : (
          <div className='text-center text-hanaindigo text-xl'>
            상담 일지가 없습니다.
          </div>
        )}
      </div>
    </Section>
  );
}
