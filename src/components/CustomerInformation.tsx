// 😭😭😭😭😭😭😭😭한 손님이 여러명의 pb와 상담을 한 일지가 나오게끔 수정을 해야해여!
import { useEffect, useState } from 'react';

type Customer = {
  id: number;        
  name: string;     
  sex: string;     
};

type CustomerPB = {
  id: number;        
  customer_id: number;    
  date: string;     
  count: number;   
  memo: string;     
};

type CustomerInformationProps = {
  customerId: number | null; // 선택된 고객 ID
}

export default function CustomerInformation({ customerId }: CustomerInformationProps) {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  const [customerData, setCustomerData] = useState<Customer | null>(null); // 고객 데이터 상태
  const [memo, setMemo] = useState<string>(''); // 메모 상태
  const [count, setCount] = useState<number | null>(null); // 상담 횟수 상태
  const [meetDate, setMeetDate] = useState<string>(''); // 처음 만난 날짜 상태
  // const [date, setDate] = useState<string>(''); // 최근 상담 날짜 상태

  const handleEditClick = () => {
    setIsEditing(true); // 편집 모드로 전환
  };

  const handleSaveClick = () => {
    setIsEditing(false); // 편집 모드 해제
    // 메모 저장 로직 (필요시 추가)
  };

  const handleCancelClick = () => {
    setIsEditing(false); // 편집 모드 해제
    // 원래 메모로 되돌리기 (필요시 원래 값을 가져올 수 있도록 로직 추가)
  };

  // 고객 정보를 가져오는 함수
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('../../public/data/Customer.json');
        const data = await response.json();
        const customer = data.find((c: Customer) => c.id === customerId);
        setCustomerData(customer || null);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    const fetchMemoData = async () => {
      try {
        const response = await fetch('../../public/data/Customer_PB.json');
        const data = await response.json();
        const customerMemo = data.find((c: CustomerPB) => c.customer_id === customerId);
        if (customerMemo) {
          setMemo(customerMemo.memo); // 메모 상태 업데이트
          setCount(customerMemo.count); // 상담 횟수 상태 업데이트
          setMeetDate(customerMemo.date); // 처음 만난 날짜 상태 업데이트
        } else {
          setMemo('메모 없음'); // 메모가 없는 경우 기본값 설정
          setCount(null); // 상담 횟수가 없는 경우 null 설정
          setMeetDate(''); // 처음 만난 날짜가 없는 경우 기본값 설정
        }
      } catch (error) {
        console.error('Error fetching memo data:', error);
      }
    };

    fetchCustomerData();
    fetchMemoData();
  }, [customerId]);

  return (
    <div className={`flex flex-col w-[25rem] h-[30rem] bg-[#fff] rounded-lg shadow-lg`}>
      {/* 헤더 */}
      <div className="bg-hanaindigo text-[#fff] text-[1.5rem] font-extrabold p-4 rounded-t-lg pl-5">
        {customerData?.name} 손님 정보
      </div>

      {/* 고객 정보 표시 */}
      {customerData ? (
        <div className="p-4">
          <div className="bg-[#fff] rounded-lg p-4 mb-2 shadow-lg border border-gray-200">
            <div className="flex justify-between text-black text-[1rem] font-light">
              <span>손님과 만난 날짜</span>
              <span>{meetDate || '정보 없음'}</span>
            </div>
          </div>

          <div className="bg-[#fff] rounded-lg p-4 mb-2 shadow-lg border border-gray-200">
            <div className="flex justify-between text-black text-[1rem] font-light">
              <span>최근 상담 날짜</span>
              {/* <span>{date || '정보 없음'}</span> */}
              <span>정보 없음</span>
            </div>
          </div>

          <div className="bg-[#fff] rounded-lg p-4 mb-2 shadow-lg border border-gray-200">
            <div className="flex justify-between text-black text-[1rem] font-light">
              <span>상담 횟수</span>
              <span>{count !== null ? count : '정보 없음'}</span>
            </div>
          </div>

          {/* 메모 부분 */}
          <div className="bg-[#fff] rounded-lg p-3 mb-2 shadow-lg border border-gray-200">
            <div className="flex justify-between text-black text-[1rem] font-light">
              <span>메모</span>
              {isEditing ? (
                <span className="flex space-x-2">
                  <button onClick={handleSaveClick} className="bg-green-400 text-white rounded-lg px-2 py-1">저장</button>
                  <button onClick={handleCancelClick} className="bg-red-400 text-white rounded-lg px-2 py-1">취소</button>
                </span>
              ) : (
                <button className='m-1 text-red-500 font-bold' onClick={handleEditClick}>EDIT</button>
              )}
            </div>
            <div className='bg-white rounded-xl p-3 border h-[8rem] overflow-auto mt-1'>
              {isEditing ? (
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className='w-full h-full rounded-xl resize-none'
                />
              ) : (
                <span>{memo}</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-hanaindigo pt-4 text-xl">손님을 선택해주세요.</div>
      )}
    </div>
  );
}

