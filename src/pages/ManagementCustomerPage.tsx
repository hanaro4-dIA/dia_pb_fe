import { useState, useEffect } from 'react';
import GL from '../components/GuestList';
import SCL from '../components/ScheduledConsultationList';
import CR from '../components/ConsultationRequest';
import D from '../components/ConsultationJournalList';
import CI from '../components/CustomerInformation';

function ManagementCustomerPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null); // 선택된 고객 ID 상태
  const [customers, setCustomers] = useState<any[]>([]); // 고객 데이터 상태

  // 고객 데이터를 가져오는 함수
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('../../public/data/Customer.json');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="flex items-start justify-center bg-gray-100 w-full h-screen p-5">
        
        <div className="flex flex-col mr-5">
            <div className="w-[25rem] h-[56rem] bg-white rounded-3xl shadow-lg">
                <GL customers={customers} onSelectCustomer={setSelectedCustomerId} />{/* 손님 목록 */}
            </div>
        </div>

    {/* 두 번째 열: 손님 정보 */}
        <div className="flex flex-col mr-5 mb-5">
            <div className="w-[25rem] h-[30rem] bg-white rounded-3xl shadow-lg ml-2 mr-2">
            <CI customerId={selectedCustomerId} /> {/* 손님 정보 */}
            </div>
            <div className="w-[25rem] h-[25rem] bg-white rounded-3xl shadow-lg ml-2 mr-2 mt-4">
            <SCL height="25rem" /> {/* 예정된 상담 일정 */}
            </div>
        </div>

        
        <div className="flex flex-col">
            <div className="w-[25rem] h-[56rem] bg-white rounded-3xl shadow-lg">
            <D customerId={selectedCustomerId} />{/* 상담 일지 */}
            </div>
        </div>
        
    </div>
  );
}

export default ManagementCustomerPage;





    //    {/* 손님 목록 */}
    //     <div className="flex flex-col">
    //         <div className="w-[25rem] h-[56rem] bg-white rounded-3xl shadow-lg">
    //             <A customers={customers} onSelectCustomer={setSelectedCustomerId} />
    //         </div>
    //     </div>