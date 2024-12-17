import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import ConsultationJournalList from '../containers/ConsultationJournalList';
import ConsultationScript from '../containers/ConsultationScript';
import CustomerInformation from '../containers/CustomerInformation';
import MakeJournal from '../containers/MakeJournal';
import { type TCustomerProps } from '../types/dataTypes';

export default function ConsultingPage() {
  const [customerName, setCustomerName] = useState<string>();
  const { id } = useParams();

  // 손님 이름 불러오기 함수
  const fetchCustomerName = async (customerId: number) => {
    try {
      const response = await fetch('/data/Customers.json');
      const customerData: TCustomerProps[] = await response.json();
      const customer = customerData.find(({ id }) => id === customerId);

      if (customer) {
        setCustomerName(customer.name);
      } else {
        setCustomerName('손님 없음');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCustomerName(Number(id));
    }
  }, [id]);

  return (
    <>
      <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
        {/* 첫번째 열 */}
        <div className='flex flex-col w-1/4 h-full space-y-4'>
          <div className='flex justify-between p-3 items-center border-b border-black'>
            <div
              className='text-2xl text-hanagold'
              style={{ fontFamily: 'noto-bold, sans-serif' }}
            >
              {customerName} 손님
            </div>
            <div>
              <Button className='border border-hanaindigo bg-white text-black hover:bg-hanagold hover:text-white'>
                전화
              </Button>
            </div>
          </div>

          {/* 손님 정보 */}
          <div className='h-fit'>
            <CustomerInformation />
          </div>

          {/* 상담일지 리스트 */}
          <div className='flex-grow overflow-y-auto'>
            <ConsultationJournalList />
          </div>
        </div>

        {/* 두번째 열: STT 자동 작성란 */}
        <div className='flex flex-col w-1/4 h-full'>
          <ConsultationScript />
        </div>

        {/* 세번째 열: 상담일지 작성하기 */}
        <div className='flex flex-col w-1/2 h-full'>
          <MakeJournal />
        </div>
      </div>
    </>
  );
}
