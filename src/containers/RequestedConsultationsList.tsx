import { useEffect, useState } from 'react';
import clearAllRequests from '../assets/clearAllRequests.gif';
import { RequestedConsultationItem } from '../components/RequestedConsultationItem';
import Section from '../components/Section';
import useFetch from '../hooks/useFetch';
import { type TConsultationProps } from '../types/dataTypes';

export default function RequestedConsultationsList({
  toggleRefetch,
}: {
  toggleRefetch: () => void;
}) {
  const { data, error } = useFetch<TConsultationProps[]>(
    `reserves?status=false`
  );
  const [requestedConsultations, setRequestedConsultations] = useState<
    TConsultationProps[] | []
  >([]);

  // useFetch로 가져온 초기 데이터 설정
  useEffect(() => {
    setRequestedConsultations(data || []);
  }, [data]);

  // WebSocket 연결
  useEffect(() => {
    const socket = new WebSocket(
      'wss://diapb.kebhana.topician.com/api/wss/consultation'
    ); //spring

    // socket.onopen = () => {
    //   console.log('WebSocket 연결 성공');
    // };

    socket.onmessage = (e) => {
      try {
        const rawData = JSON.parse(e.data);

        const newConsultation: TConsultationProps = {
          ...rawData,
          hopeDate: rawData.hopeDate.join('-'), // [2024, 12, 24] -> "2024-12-24"
          hopeTime: rawData.hopeTime.join(':'), // [12, 0] -> "12:00"
          reserveDate: rawData.reserveDate.join('-'), // [2024, 12, 24] -> "2024-12-24"
          reserveTime: rawData.reserveTime.slice(0, 2).join(':'), // [9, 47, ...] -> "9:47"
        };

        // 상태 업데이트
        setRequestedConsultations((prev) => [...prev, newConsultation]);
      } catch (error) {
        console.error('WebSocket 메시지 처리 중 오류 발생:', error);
      }
    };

    // socket.onerror = (error) => {
    //   console.error('WebSocket 에러:', error);
    // };

    // socket.onclose = () => {
    //   console.log('WebSocket 연결 종료');
    // };

    return () => {
      socket.close();
    };
  }, []);

  const handleApprove = (id: string) => {
    setRequestedConsultations((prev) =>
      prev.filter((consultation) => consultation.id !== Number(id))
    );
  };

  const setApprove = (consultation: TConsultationProps) => {
    setRequestedConsultations([
      ...requestedConsultations.filter((c) => c.id !== consultation.id),
    ]);

    toggleRefetch();
  };

  useEffect(() => {
    if (error) {
      console.error('들어온 상담 요청 조회 중 발생한 에러: ', error);
    }
  }, [error]);

  return (
    <Section title='들어온 상담 요청' layoutClassName='h-full'>
      {requestedConsultations.length > 0 ? (
        <div className='w-full h-fit p-4'>
          {requestedConsultations
            .sort((a, b) => {
              // 빠른 상담 요청은 최상단에 배치
              if (a.categoryId === 1 && b.categoryId !== 1) return -1;
              if (a.categoryId !== 1 && b.categoryId === 1) return 1;
              return 0;
            })
            .filter((consult) => !consult.approve)
            .map((consultation) => (
              <RequestedConsultationItem
                key={consultation.id}
                consultation={consultation}
                setApprove={setApprove}
                onApprove={handleApprove}
              />
            ))}
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center mt-7'>
          <img
            src={clearAllRequests}
            className='w-4/5 h-4/5 items-center'
            alt='모든 요청 처리됨'
          />
          <span className='text-center text-hanaindigo h-full text-sm py-3'>
            모든 상담 요청이 승인되었습니다:)
          </span>
        </div>
      )}
    </Section>
  );
}
