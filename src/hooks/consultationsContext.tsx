import React, { createContext, useState, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { type TConsultationContextType } from '../types/componentTypes';
import { type TConsultationProps } from '../types/dataTypes';

const ConsultationContext = createContext<TConsultationContextType | undefined>(
  undefined
);

export const ConsultationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [requestedConsultations, setRequestedConsultations] = useState<
    TConsultationProps[]
  >([]);
  const [approvedConsultations, setApprovedConsultations] = useState<
    TConsultationProps[]
  >([]);

  const { fetchData: fetchRequested } = useFetch<TConsultationProps[]>(
    'pb/reserves?status=false'
  );
  const { fetchData: fetchApproved } = useFetch<TConsultationProps[]>(
    'pb/reserves?status=true&type=upcoming'
  );
  const { fetchData: putApprove } = useFetch('pb/reserves', 'PUT');

  const fetchRequestedConsultations = async () => {
    try {
      const result = await fetchRequested();
      if (Array.isArray(result)) {
        setRequestedConsultations(result);
      } else {
        console.error('들어온 상담 요청 조회 중 발생한 에러: ', result);
      }
    } catch (error) {
      console.error('들어온 상담 요청 조회 중 발생한 에러: ', error);
    }
  };

  const fetchApprovedConsultations = async () => {
    try {
      const params: Record<string, string> = {
        status: 'true',
        type: 'upcoming',
      };

      const result = await fetchApproved(params);
      if (Array.isArray(result)) {
        setApprovedConsultations(result);
      } else {
        console.error('예정된 상담 요청 조회 중 발생한 에러: ', result);
      }
    } catch (error) {
      console.error('예정된 상담 요청 조회 중 발생한 에러: ', error);
    }
  };

  const approveConsultation = async (id: number) => {
    if (putApprove) {
      await putApprove({ id, status: true });
      setRequestedConsultations((prev) =>
        prev.filter((consultation) => consultation.id !== id)
      );
    }
    await fetchApprovedConsultations();
  };

  return (
    <ConsultationContext.Provider
      value={{
        requestedConsultations,
        approvedConsultations,
        fetchRequestedConsultations,
        fetchApprovedConsultations,
        approveConsultation,
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultationContext = () => {
  const context = useContext(ConsultationContext);
  if (context === undefined) {
    throw new Error(
      'useConsultationContext must be used within a ConsultationProvider'
    );
  }
  return context;
};
