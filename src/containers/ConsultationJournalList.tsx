import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { ConsultationJournalListItem } from '../components/ConsultationJournalListItem';
import { SearchField } from '../components/SearchField';
import Section from '../components/Section';
import { type TPbProps } from '../lib/types';
import { type TJournalsProps } from '../lib/types';
import ReadJournalWindow from '../pages/ReadJournalWindow';

type TConsultationJournalListProps = {
  customerId: number;
  className?: string;
};

export default function ConsultationJournalList({
  customerId,
}: TConsultationJournalListProps) {
  const [consultationJourData, setConsultationJourData] = useState<
    (TJournalsProps & { pbName: string })[]
  >([]);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태

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
          .filter((consultation) => consultation.customer_id === customerId)
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
    if (customerId !== null) {
      fetchConsultationData();
    }
  }, [customerId]);

  // 상담일지 검색하기
  const filteredJournal = consultationJourData.filter(
    ({ title, content }) =>
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.toLowerCase().includes(searchTerm.toLowerCase())
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
