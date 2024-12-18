import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ApprovedConsultationItem } from '../components/ApprovedConsultationItem';
import Section from '../components/Section';
import useFetch from '../hooks/useFetch';
import { type TConsultingProps } from '../types/dataTypes';

// 예정된 상담 일정
export default function ApprovedConsultationsList() {
  const [consultationData, setConsultationData] = useState<
    TConsultingProps[] | null
  >([]);
  const { id } = useParams();

  // useEffect(() => {
  //   const fetchNotConsultingData = async () => {
  //     try {
  //       const response = await fetch('/data/Consultings.json');
  //       const data: TConsultingProps[] = await response.json();

  //       // approve가 아직 true 인 것들 중에
  //       // title이 '빠른 상담 요청'인 항목을 우선 정렬하고, 그 다음 requestDay 기준으로 오름차순 정렬
  //       const filteredData = data
  //         .filter(({ approve, customerName }) =>
  //           id ? approve && customerName === Number(id) : approve
  //         )
  //         .sort((a, b) => {
  //           if (a.title === '삐른 상담 요청' && !(b.title === '삐른 상담 요청'))
  //             return -1;
  //           if (!(a.title === '삐른 상담 요청') && b.title === '삐른 상담 요청')
  //             return 1;
  //           return (
  //             new Date(a.hopeDate).getTime() - new Date(b.hopeDate).getTime()
  //           );
  //         });

  //       setConsultationData(filteredData);
  //     } catch (error) {
  //       console.error('Error fetching consultation data: ', error);
  //     }
  //   };

  //   fetchNotConsultingData();
  // }, [id, consultations]);

  const { data, error } = useFetch<TConsultingProps[]>(
    'pb/reserves?status=true&type=upcoming'
  );

  useEffect(() => {
    setConsultationData(data);
  }, [data]);
  console.error(error);

  return (
    <Section
      // title={
      //   id
      //     ? // 추후 수정 필요
      //       `${consultationData[id]} 손님의 예정된 상담 일정`
      //     : '예정된 상담 일정'
      // }
      title='(손님의) 예정된 상담 일정'
      layoutClassName='h-full'
    >
      <div className='w-full p-4 '>
        {consultationData ? (
          consultationData.map((consultationData, index) => (
            <ApprovedConsultationItem key={index} {...consultationData} />
          ))
        ) : (
          <div className='text-center text-hanaindigo text-xl'>
            일정이 없습니다.
          </div>
        )}
      </div>
    </Section>
  );
}
