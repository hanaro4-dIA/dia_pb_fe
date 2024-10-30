import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConsultationJournalList from '../components/ConsultationJournalList';
import CustomerInformation from '../components/CustomerInformation';
import MakeJournal from '../components/MakeJournal';
import STT from '../components/Stt';
import { Button } from '../components/ui/button';

type TCustomer = {
  id: number;
  name: string;
};

export default function ConsultingPage() {
  const [customerName, setCustomerName] = useState<string | null>(null);
  const { id } = useParams();

  // 손님 이름 불러오기 함수
  const fetchCustomerName = async (customerId: number) => {
    try {
      const response = await fetch('/data/Customers.json');
      const customerData: TCustomer[] = await response.json();
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

  useEffect(() => {
    if (id) {
      fetchCustomerName(Number(id));
    }
  }, [id]);

  return (
    <>
      <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
        {/* 프로필과 들어온 상담 요청 */}
        <div className='flex flex-col flex-grow h-full space-y-4'>
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
          <div className='h-1/2'>
            <CustomerInformation customerId={Number(id)} />
          </div>

          {/* Dictionary 버튼 */}
          <Link className='w-full' to={'/dictionary'}>
            <Button className='w-full bg-white text-black border border-hanaindigo hover:text-white hover:bg-hanagold'>
              키워드 DB 목록 바로가기
            </Button>
          </Link>

          {/* 상담일지 리스트 */}
          <div className='h-1/2'>
            <ConsultationJournalList customerId={Number(id)} />
          </div>
        </div>

        {/* STT 자동 작성란 */}
        <div className='flex flex-grow h-full'>
          <STT />
        </div>

        {/* 상담일지 작성하기 */}
        <div className='flex flex-col flex-grow h-full'>
          <MakeJournal />
        </div>
      </div>
    </>
  );
}
