import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import ConsultationJournalList from '../containers/ConsultationJournalList';
import ConsultationScript from '../containers/ConsultationScript';
import CustomerInformation from '../containers/CustomerInformation';
import MakeJournal from '../containers/MakeJournal';
import useFetch from '../hooks/useFetch';
import { type TCustomerProps } from '../types/dataTypes';

export default function ConsultingPage() {
  const location = useLocation();
  const { customerId } = location.state || {};
  const { consultingId } = location.state || {};

  const { data, error } = useFetch<TCustomerProps>(
    `customers/list/${customerId}`
  );

  const [customerData, setCustomerData] = useState<TCustomerProps | null>(null);

  useEffect(() => {
    if (data) setCustomerData(data);
  }, [data]);
  console.error('손님 한 명 정보 조회 중 발생한 에러: ', error);

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
              {customerData?.name} 손님
            </div>
            <div>
              <Button className='border border-hanaindigo bg-white text-black hover:bg-hanagold hover:text-white'>
                전화
              </Button>
            </div>
          </div>

          {/* 손님 정보 */}
          <div className='h-fit'>
            <CustomerInformation customerData={customerData} />
          </div>

          {/* 상담일지 리스트 */}
          <div className='flex-grow overflow-y-auto'>
            <ConsultationJournalList customerId={customerData?.id || 0} />
          </div>
        </div>

        {/* 두번째 열: STT 자동 작성란 */}
        <div className='flex flex-col w-1/4 h-full'>
          <ConsultationScript consultingId={consultingId} />
        </div>

        {/* 세번째 열: 상담일지 작성하기 */}
        <div className='flex flex-col w-1/2 h-full'>
          <MakeJournal />
        </div>
      </div>
    </>
  );
}
