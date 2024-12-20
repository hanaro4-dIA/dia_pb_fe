import React, { createContext, useState, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { type TConsultingProps } from '../types/dataTypes';

interface ConsultationContextType {
  requestedConsultations: TConsultingProps[];
  approvedConsultations: TConsultingProps[];
  fetchRequestedConsultations: () => void;
  fetchApprovedConsultations: () => void;
  approveConsultation: (id: number) => Promise<void>;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(
  undefined
);

export const ConsultationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [requestedConsultations, setRequestedConsultations] = useState<
    TConsultingProps[]
  >([]);
  const [approvedConsultations, setApprovedConsultations] = useState<
    TConsultingProps[]
  >([]);

  const { fetchData: fetchRequested } = useFetch<TConsultingProps[]>(
    'pb/reserves?status=false'
  );
  const { fetchData: fetchApproved } = useFetch<TConsultingProps[]>(
    'pb/reserves?status=true&type=upcoming'
  );
  const { fetchData: putApprove } = useFetch('pb/reserves', 'PUT');

  const fetchRequestedConsultations = async () => {
    try {
      const result = await fetchRequested();
      if (Array.isArray(result)) {
        setRequestedConsultations(result);
      } else {
        console.error('Unexpected result type:', result);
      }
    } catch (error) {
      console.error('Error fetching requested consultations:', error);
    }
  };

  const fetchApprovedConsultations = async () => {
    try {
      const result = await fetchApproved();
      if (Array.isArray(result)) {
        setApprovedConsultations(result);
      } else {
        console.error('Unexpected result type:', result);
      }
    } catch (error) {
      console.error('Error fetching approved consultations:', error);
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
