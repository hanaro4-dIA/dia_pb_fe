import { useEffect, useState } from 'react';
import { RequestedConsultationItem } from '../components/RequestedConsultationItem';
import Section from '../components/Section';
import useFetch from '../hooks/useFetch';
import { type TConsultingProps } from '../types/dataTypes';

// 들어온 상담 요청
export default function ConsultationRequest() {
  // useEffect(() => {
  //   const fetchNotConsultingData = async () => {
  //     try {
  //       const response = await fetch('/data/Consultings.json');
  //       const data: TConsultingProps[] = await response.json();

  //       // approve가 아직 false 인 것들 중에
  //       // title이 '빠른 상담 요청'인 항목을 우선 정렬하고, 그 다음 requestDay 기준으로 오름차순 정렬
  //       const filteredData = data
  //         .filter(({ approve }) => approve === false)
  //         .sort((a, b) => {
  //           if (a.title === '빠른 상담 요청' && !(b.title === '빠른 상담 요청'))
  //             return -1;
  //           if (!(a.title === '빠른 상담 요청') && b.title === '빠른 상담 요청')
  //             return 1;
  //           return (
  //             new Date(a.hope_date).getTime() -
  //             new Date(b.reserve_date).getTime()
  //           );
  //         });

  //       setConsultationData(filteredData);
  //     } catch (error) {
  //       console.error('Error fetching consultation data:');
  //     }
  //   };
  //   fetchNotConsultingData();
  // }, []);

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
        {consultationData ? (
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