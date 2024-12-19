import { useEffect, useState } from 'react';
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

  return (
    <Section title='들어온 상담 요청' layoutClassName='h-full'>
      <div className='w-full h-fit p-4'>
        {consultationData && consultationData.length > 0 ? (
          consultationData.map((consultation) => (
            <RequestedConsultationItem
              key={consultation.id}
              {...consultation}
            />
          ))
        ) : (
          <div className='text-center text-hanaindigo p-4 h-full text-xl  '>
            모든 상담 요청이 승인되었습니다.
          </div>
        )}
      </div>
    </Section>
  );
}
