import { useEffect, useState } from 'react';
import { type TPbProps } from '../lib/types';
import { type TCustomerPbProps } from '../lib/types';
import { type TJournalsProps } from '../lib/types';
import ReactDOM from 'react-dom';
import ReadJournal from './ReadJournal';

type TConsultationJournalListProps = {
  customerId: number | null;
  className?: string; // 추가된 className prop
};

export default function ConsultationJournalList({
  customerId,
}: TConsultationJournalListProps) {
  const [consultationJourData, setConsultationJourData] = useState<
    TJournalsProps[]
  >([]);
  const [pbName, setPbName] = useState<string | null>(null);
  const [pbId, setPbId] = useState<number | null>(null);
  const fetchCustomerPB = async () => {
    try {
      const response = await fetch('/data/Customer_PB.json');
      const customerPBData = await response.json();
      const customerPB = customerPBData.find(
        (pb: TCustomerPbProps) => pb.customer_id === customerId
      );

      if (customerPB) {
        setPbId(customerPB.id);
        fetchPBName(customerPB.pb_id);
      }
    } catch (error) {
      alert('Error fetching Customer PB data:');
    }
  };

  const fetchPBName = async (pbId: number) => {
    try {
      const response = await fetch('/data/PB.json');
      const pbData = await response.json();
      const pb = pbData.find((pb: TPbProps) => pb.id === pbId);

      if (pb) {
        setPbName(pb.name);
      }
    } catch (error) {
      alert('Error fetching PB data:');
    }
  };

  const fetchConsultationData = async () => {
    if (pbId === null) return;

    try {
      const response = await fetch('/data/Journals.json');
      const data = await response.json();
      const filteredData = data.filter(
        (consultation: TJournalsProps) => consultation.customer_pb_id === pbId
      );
      setConsultationJourData(filteredData);
    } catch (error) {
      alert('Error fetching consultation data:');
    }
  };

  useEffect(() => {
    fetchCustomerPB();
  }, [customerId]);

  useEffect(() => {
    fetchConsultationData();
  }, [pbId]);

const openNewWindow = (consultation: TJournalsProps) => {
  const newWindow = window.open('', '_blank', 'width=800,height=600');

  if (newWindow) {
    // 부모의 스타일을 가져오는 부분
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("");
        } catch (e) {
          console.warn("Failed to load some CSS rules:", e);
          return "";
        }
      })
      .join("");

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

    // ReactDOM을 사용하여 ReadJournal 컴포넌트를 새 창에 렌더링
    const root = newWindow.document.getElementById('journal-root');

    if (root) {
      ReactDOM.render(
        <ReadJournal consultation={consultation} pbName={pbName} />,
        root
      );
    }
  }
};

  return (
    <div className='flex flex-col h-full bg-white'>
      <div className='bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5'>
        상담일지 리스트
      </div>
      <div className='h-full overflow-auto border-x border-b border-gray-200'>
        <div className='p-4'>
          {consultationJourData.length > 0 ? (
            consultationJourData.map((consultation, index) => (
              <div
                key={index}
                onClick={() => openNewWindow(consultation)} // 새 창 열기
                className='bg-white rounded-lg p-4 mb-4 shadow-lg flex items-center border border-gray-200 cursor-pointer'
              >
                <div className='text-hanaindigo text-[1rem] font-bold mr-4'>
                  {index + 1}
                </div>
                <div className='flex-1 max-w-[90%]'>
                  <div className='flex justify-between text-black text-[1rem] font-light'>
                    <span>{pbName ? pbName : 'PB 이름 없음'}</span>
                    <span>{consultation.date}</span>
                  </div>
                  <div className='text-[1rem] font-bold truncate'>
                    {consultation.content}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center text-hanaindigo text-xl'>
              상담 일지가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}