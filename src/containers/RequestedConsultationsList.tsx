import { useEffect, useState } from 'react';
import clear from '../assets/clear.gif';
import { RequestedConsultationItem } from '../components/RequestedConsultationItem';
import Section from '../components/Section';
import useFetch from '../hooks/useFetch';
import { type TConsultingProps } from '../types/dataTypes';

// 들어온 상담 요청
export default function RequestedConsultationsList() {
  const { data, error } = useFetch<TConsultingProps[]>(
    'pb/reserves?status=false'
  );

  const [consultationData, setConsultationData] = useState<
    TConsultingProps[] | null
  >([]);

  useEffect(() => {
    setConsultationData(data);
  }, [data]);
  console.error(error);

  const handleApprove = (id: string) => {
    setConsultationData(
      (prev) =>
        prev?.filter((consultation) => consultation.id !== Number(id)) || []
    );
  };

  return (
    <Section title='들어온 상담 요청' layoutClassName='h-full'>
      <div className='w-full h-fit p-4'>
        {consultationData && consultationData.length > 0 ? (
          consultationData.map((consultation) => (
            <RequestedConsultationItem
              key={consultation.id}
              {...consultation}
              onApprove={handleApprove}
            />
          ))
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <img src={clear} className='w-4/5 h-4/5' />
            <span className='text-center text-hanaindigo h-full text-s py-3'>
              모든 상담 요청이 승인되었습니다:)
            </span>
          </div>
        )}
      </div>
    </Section>
  );
}
