import { useEffect, useState } from 'react';
import ReadJournal from './ReadJournal'; 
import { type TPbProps } from '../lib/types';
import { type TCustomerPbProps } from '../lib/types';
import { type TJournalsProps } from '../lib/types';

type TConsultationJournalListProps = {
  customerId: number | null;
  className?: string; // 추가된 className prop
};

export default function ConsultationJournalList({
  customerId,
}: TConsultationJournalListProps) {
  const [consultationJourData, setConsultationJourData] = useState<TJournalsProps[]>([]);
  const [pbName, setPbName] = useState<string | null>(null);
  const [pbId, setPbId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<TJournalsProps | null>(null);

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

  // 모달 열기 핸들러
  const openModal = (consultation: TJournalsProps) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConsultation(null);
  };

  return (
    <div className={`flex flex-col h-full bg-white`}>
      <div className='bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5'>
        상담일지 리스트
      </div>
      <div className='overflow-auto border-x border-b border-gray-200'>
        <div className='p-4'>
          {consultationJourData.length > 0 ? (
            consultationJourData.map((consultation, index) => (
              <div
                key={index}
                onClick={() => openModal(consultation)}
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

      {/* 모달 컴포넌트 */}
      {isModalOpen && selectedConsultation && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
          onClick={closeModal} // 모달 외부 클릭 시 닫기 이벤트
        >
          <div
            className='relative bg-white rounded-lg w-[90%] max-w-2xl'
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록 
          >
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-white hover:font-bold z-50 p-2'
            >
              x
            </button>
            <ReadJournal consultation={selectedConsultation} pbName={pbName} />
          </div>
        </div>
      )}

    </div>
  );
}