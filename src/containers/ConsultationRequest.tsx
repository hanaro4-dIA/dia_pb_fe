import { useEffect, useState } from 'react';
import { RequestedConsultationItem } from '../components/RequestedConsultationItem';
import Section from '../components/Section';
import { type TRequestedConsultationsProps } from '../types/dataTypes';

type TConsultationRequestProps = {
  onApprove: (consultation: TRequestedConsultationsProps) => void;
};

export default function ConsultationRequest({
  onApprove,
}: TConsultationRequestProps) {
  const [consultationData, setConsultationData] = useState<
    TRequestedConsultationsProps[]
  >([]);

  useEffect(() => {
    const fetchNotConsultingData = async () => {
      try {
        const response = await fetch('/data/Consultings.json');
        const data: TRequestedConsultationsProps[] = await response.json();

        // 필터 및 정렬 조건: approvalStatus가 false이면서 finishStatus가 false인 항목만
        // quick이 true인 항목을 우선 정렬하고, 그 다음 requestDay 기준으로 오름차순 정렬
        const filteredData = data
          .filter(
            ({ approvalStatus, finishStatus }) =>
              approvalStatus === false && finishStatus === false
          )
          .sort((a, b) => {
            if (a.quick && !b.quick) return -1;
            if (!a.quick && b.quick) return 1;
            return (
              new Date(a.requestDay).getTime() -
              new Date(b.requestDay).getTime()
            );
          });

        setConsultationData(filteredData);
      } catch (error) {
        alert('Error fetching consultation data:');
      }
    };

    fetchNotConsultingData();
  }, []);

  // 승인 버튼 클릭 시 상태 변경
  const toggleApprovalStatus = (id: number) => {
    setConsultationData((prevData) =>
      prevData.filter((consultation) => {
        if (consultation.id === id && consultation.approvalStatus === false) {
          const updatedConsultation = { ...consultation, approvalStatus: true };
          onApprove(updatedConsultation); // 승인된 상담을 전달
          return false; // 승인된 항목을 제거
        }
        return true;
      })
    );
  };

  return (
    <>
      <Section title='들어온 상담 요청'>
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
    </>
  );
}
