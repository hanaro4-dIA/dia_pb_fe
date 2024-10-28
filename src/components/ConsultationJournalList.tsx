import { useEffect, useState } from 'react';
import { type TJournalsProps } from '../lib/types';

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
      const response = await fetch('../../public/data/Customer_PB.json');
      const customerPBData = await response.json();
      const customerPB = customerPBData.find(
        (pb: { id: number; customer_id: number }) =>
          pb.customer_id === customerId
      );

      if (customerPB) {
        setPbId(customerPB.id);
        fetchPBName(customerPB.pb_id);
      }
    } catch (error) {
      console.error('Error fetching Customer PB data:', error);
    }
  };

  const fetchPBName = async (pbId: number) => {
    try {
      const response = await fetch('../../public/data/PB.json');
      const pbData = await response.json();
      const pb = pbData.find(
        (pb: { id: number; name: string }) => pb.id === pbId
      );

      if (pb) {
        setPbName(pb.name);
      }
    } catch (error) {
      console.error('Error fetching PB data:', error);
    }
  };

  const fetchConsultationData = async () => {
    if (pbId === null) return;

    try {
      const response = await fetch('../../public/data/Journals.json');
      const data = await response.json();
      const filteredData = data.filter(
        (consultation: TJournalsProps) => consultation.customer_pb_id === pbId
      );
      setConsultationJourData(filteredData);
    } catch (error) {
      console.error('Error fetching consultation data:', error);
    }
  };

  useEffect(() => {
    fetchCustomerPB();
  }, [customerId]);

  useEffect(() => {
    fetchConsultationData();
  }, [pbId]);

  return (
    <div
      className={`flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200`}
    >
      <div className='bg-hanaindigo text-[#fff] text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5'>
        상담일지 리스트
      </div>
      <div className='overflow-auto'>
        <div className='p-4'>
          {consultationJourData.length > 0 ? (
            consultationJourData.map((consultation, index) => (
              <div
                key={index}
                className='bg-[#fff] rounded-lg p-4 mb-4 shadow-lg flex items-center border border-gray-200'
              >
                <div className='text-hanaindigo text-[1rem] font-bold mr-4'>
                  {index + 1}
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between text-black text-[1rem] font-light'>
                    <span>{pbName ? pbName : 'PB 이름 없음'}</span>
                    <span>{consultation.date}</span>
                  </div>
                  <div
                    className='text-[1rem] font-bold text-ellipsis overflow-hidden whitespace-nowrap'
                    style={{ maxWidth: '20rem' }}
                  >
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
