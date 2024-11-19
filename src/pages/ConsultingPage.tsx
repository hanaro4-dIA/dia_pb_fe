import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConsultationJournalList from '../components/ConsultationJournalList';
import CustomerInformation from '../components/CustomerInformation';
import MakeJournal from '../components/MakeJournal';
import STT from '../components/Stt';
import { Button } from '../components/ui/button';
import { type TCustomersProps } from '../lib/types';
import { createRoot } from 'react-dom/client';
import DictionaryPage from './DictionaryPage';

export default function ConsultingPage() {
  const [customerName, setCustomerName] = useState<string>();
  const { id } = useParams();

  // 손님 이름 불러오기 함수
  const fetchCustomerName = async (customerId: number) => {
    try {
      const response = await fetch('/data/Customers.json');
      const customerData: TCustomersProps[] = await response.json();
      const customer = customerData.find(({ id }) => id === customerId);

      if (customer) {
        setCustomerName(customer.name);
      } else {
        setCustomerName('손님 없음');
      }
    } catch (error) {
      alert('Error fetching customer data:');
      setCustomerName('데이터 로드 실패');
    }
  };

  const [selectedText, setSelectedText] = useState('');

  // 첫 번째 컴포넌트에서 호출할 콜백 함수
  const handleTextSelect = (text: string) => {
    setSelectedText(text);
  };

  useEffect(() => {
    if (id) {
      fetchCustomerName(Number(id));
    }
  }, [id]);

  const openNewWindow = () => {
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
            <title>키워드 DB 목록</title>
            <style>${styles}</style>
          </head>
          <body>
            <div id="dictionary-root"></div>
          </body>
        </html>
      `);
      newWindow.document.close();

      const rootElement = newWindow.document.getElementById('dictionary-root');
      if (rootElement) {
        const root = createRoot(rootElement);
        root.render(<DictionaryPage />);
      }
    }
  };

  return (
    <>
      <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
        {/* 첫번째 열 */}
        <div className='flex flex-col w-1/4 h-full space-y-4'>
          <div className='flex justify-between p-3 items-center border-b border-black'>
            <div className='text-2xl font-bold text-hanagold'>
              {customerName} 손님
            </div>
            <div>
              <Button className='border border-hanaindigo bg-white text-black hover:bg-hanagold hover:text-white'>
                전화
              </Button>
            </div>
          </div>

          {/* 손님 정보 */}
          <div className=''>
            <CustomerInformation customerId={Number(id)} />
          </div>

          {/* Dictionary 버튼
          <Button
            className='w-full bg-white text-black border border-hanaindigo hover:text-white hover:bg-hanagold'
            onClick={openNewWindow}
          >
            키워드 DB 목록 바로가기
          </Button> */}

          {/* 상담일지 리스트 */}
          <div className='flex-grow overflow-y-auto'>
            <ConsultationJournalList customerId={Number(id)} />
          </div>
        </div>

        {/* 두번째 열: STT 자동 작성란 */}
        <div className='flex flex-col w-1/4 h-full'>
          <STT onTextSelect={handleTextSelect} />
        </div>

        {/* 세번째 열: 상담일지 작성하기 */}
        <div className='flex flex-col w-1/2 h-full'>
          <MakeJournal selectedText={selectedText} />
        </div>
      </div>
    </>
  );
}
