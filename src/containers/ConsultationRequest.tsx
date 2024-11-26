import { useEffect, useState } from 'react';
import Section from '../components/Section';
import { type TRequestedConsultationsProps } from '../lib/types';

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

  // 빠른 상담 요청 여부에 따른 테두리 변경
  const getBorderColorClass = (quick: boolean) => {
    return quick ? 'quick-border' : 'border-gray-200';
  };

  return (
    <>
      <Section title='들어온 상담 요청'>
        <div className='w-full h-fit p-4'>
          {consultationData.length > 0 ? (
            consultationData.map(
              ({
                id,
                name,
                title,
                hopeDay,
                hopeTime,
                requestDay,
                approvalStatus,
                quick,
              }) => (
                <article
                  key={id}
                  className='w-full flex flex-col justify-end mb-4 items-start'
                >
                  <small className='ml-2'>{requestDay}</small>
                  {quick}
                  <div
                    className={`bg-white rounded-lg border ${getBorderColorClass(quick)}  p-4 shadow-lg w-full`}
                  >
                    <div className='flex justify-between items-center'>
                      <div className='flex flex-col w-[70%]'>
                        <span className='w-[95%] text-[1rem] font-bold truncate	'>
                          {name} 손님
                        </span>
                        <span className='w-[95%] font-bold truncate	'>
                          {title}
                        </span>
                        <span className='text-[0.8rem] font-bold'>
                          요청일: {hopeDay} {hopeTime}
                        </span>
                      </div>

                      <button
                        className='w-[6rem] h-[2rem] text-white text-[1rem] rounded-lg bg-hanaindigo hover:bg-hanagold'
                        onClick={() => toggleApprovalStatus(id)}
                      >
                        {!approvalStatus && '승인대기'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            )
          ) : (
            <div className='text-center text-hanaindigo p-4 h-full text-xl border-x border-b border-gray-200'>
              모든 상담 요청이 승인되었습니다.
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
