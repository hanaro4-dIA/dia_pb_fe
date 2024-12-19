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

  const { data, error } = useFetch<TConsultingProps[]>(
    'pb/reserves?status=true&type=upcoming'
  );

  // 데이터가 변경되면 consultationData 상태 업데이트
  useEffect(() => {
    if (data) {
      setConsultationData(data);
    }
  }, [data]);

  console.error(error); // error 처리

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
