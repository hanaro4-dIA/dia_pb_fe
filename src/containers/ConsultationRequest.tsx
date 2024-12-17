import { useEffect, useState } from 'react';
import { RequestedConsultationItem } from '../components/RequestedConsultationItem';
import Section from '../components/Section';
import useFetch from '../hooks/useFetch';
import { type TConsultingProps } from '../types/dataTypes';

type TConsultationRequestProps = {
  onApprove: (consultation: TConsultingProps) => void;
};

// 들어온 상담 요청
export default function ConsultationRequest({
  onApprove,
}: TConsultationRequestProps) {
  const [consultationData, setConsultationData] = useState<TConsultingProps[]>(
    []
  );

  useEffect(() => {
    const fetchNotConsultingData = async () => {
      try {
        const response = await fetch('/data/Consultings.json');
        const data: TConsultingProps[] = await response.json();

        // approve가 아직 false 인 것들 중에
        // title이 '빠른 상담 요청'인 항목을 우선 정렬하고, 그 다음 requestDay 기준으로 오름차순 정렬
        const filteredData = data
          .filter(({ approve }) => approve === false)
          .sort((a, b) => {
            if (a.title === '빠른 상담 요청' && !(b.title === '빠른 상담 요청'))
              return -1;
            if (!(a.title === '빠른 상담 요청') && b.title === '빠른 상담 요청')
              return 1;
            return (
              new Date(a.hope_date).getTime() -
              new Date(b.reserve_date).getTime()
            );
          });

        setConsultationData(filteredData);
      } catch (error) {
        console.error('Error fetching consultation data:');
      }
    };
    fetchNotConsultingData();
  }, []);

  const { data, error } = useFetch<TConsultingProps[]>(
    `${import.meta.env.REACT_APP_API_KEY}/pb/reserves?status=false`
  );

  console.log('data: ', data);
  console.log('error: ', error);
  console.log(import.meta.env.REACT_APP_API_KEY);

  // 승인 버튼 클릭 시 상태 변경
  const toggleApprovalStatus = (id: number) => {
    setConsultationData((prevData) =>
      prevData.filter((consultation) => {
        if (consultation.id === id && consultation.approve === false) {
          const updatedConsultation = { ...consultation, approvalStatus: true };
          onApprove(updatedConsultation); // 승인된 상담을 전달
          return false; // 승인된 항목을 제거
        }
        return true;
      })
    );
  };

  return (
    <Section title='들어온 상담 요청' layoutClassName='h-full'>
      <div className='w-full h-fit p-4'>
        {consultationData.length > 0 ? (
          consultationData.map((consultation) => (
            <RequestedConsultationItem
              key={consultation.id}
              {...consultation}
              onApprove={toggleApprovalStatus}
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
