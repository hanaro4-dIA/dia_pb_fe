import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApprovedConsultationsList from '../containers/ApprovedConsultationsList';
import ConsultationJournalList from '../containers/ConsultationJournalList';
import CustomerInformation from '../containers/CustomerInformation';
import CustomerList from '../containers/CustomerList';
import useFetch from '../hooks/useFetch';
import { type TCustomerProps } from '../types/dataTypes';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const { data, error } = useFetch<TCustomerProps>(`customers/list/${id}`);
  const [customerData, setCustomerData] = useState<TCustomerProps | null>(null);

  useEffect(() => {
    if (data) setCustomerData(data);
  }, [data]);
  console.error('손님 한 명 정보 조회 중 발생한 에러: ', error);

  return (
    <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
      <div className='flex flex-col flex-grow w-1/4 h-full overflow-y-auto'>
        <CustomerList />
      </div>

      <div className='flex flex-col flex-grow w-1/4 h-full space-y-4'>
        <div>
          <CustomerInformation customerData={customerData} />
        </div>
        <div className='flex-grow h-full overflow-y-auto'>
          {customerData && (
            <ApprovedConsultationsList customerName={customerData.name} />
          )}
        </div>
      </div>

      <div className='flex flex-col flex-grow w-1/4 h-full'>
        <ConsultationJournalList customerId={Number(id)} />
      </div>
    </div>
  );
}
