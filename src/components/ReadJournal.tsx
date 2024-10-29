
import { useEffect, useState } from 'react';
import { LuDownload } from "react-icons/lu";
import { type TCategoryProps } from '../lib/types';
import { type TJournalsProps } from '../lib/types';

type JournalsProps = {
  consultation: TJournalsProps;
  pbName: string | null;
};

type Customer = {
  id: number;
  name: string;
};

export default function ReadJournal({ consultation, pbName }: JournalsProps) {
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);

  // 카테고리 이름 불러오기 함수
  const fetchCategoryName = async (categoryId: number) => {
    try {
      const response = await fetch('../../public/data/Category.json');
      const categoryData: TCategoryProps[] = await response.json();
      const category = categoryData.find((cg) => cg.id === categoryId);

      if (category) {
        setCategoryName(category.name);
      } else {
        setCategoryName('카테고리 없음');
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
      setCategoryName('데이터 로드 실패');
    }
  };

  // 고객 이름 불러오기 함수
  const fetchCustomerName = async (customerId: number) => {
    try {
      const response = await fetch('../../public/data/Customers.json');
      const customerData: Customer[] = await response.json();
      const customer = customerData.find((cust) => cust.id === customerId);

      if (customer) {
        setCustomerName(customer.name);
      } else {
        setCustomerName('손님 없음');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      setCustomerName('데이터 로드 실패');
    }
  };

  useEffect(() => {
    if (consultation.category_id) {
      fetchCategoryName(consultation.category_id);
    }
    if (consultation.customer_pb_id) {
      fetchCustomerName(consultation.customer_pb_id);
    }
  }, [consultation.category_id, consultation.customer_pb_id]);

  return (
    <div className='flex items-start justify-center w-full h-full space-x-4 overflow-hidden'>
      <div className='relative flex flex-col w-full h-full border shadow-lg border-gray-200 rounded-lg'>
        {/* 자세히보기 */}
        <div className='bg-hanaindigo text-white text-[1.5rem] font-extrabold p-4 rounded-t-lg pl-5'>
          상담일지 자세히보기
        </div>

        <div className='p-10 space-y-4 overflow-y-auto'>
          <div className='flex justify-between border-b border-hanaindigo border-b-3 pb-2'>
            <div className='flex gap-3'>
              <div className='text-lg font-extrabold'>카테고리</div>
              <div className='text-lg'>{categoryName}</div>
            </div>
            <div className='flex gap-3'>
              <div className='text-lg font-extrabold'>PB</div>
              <div className='text-lg'>{pbName ?? 'PB 이름 없음'}</div>
            </div>
          </div>

          <div className='flex justify-between border-b border-hanaindigo border-b-3 pb-2'>
            <div className='flex gap-3'>
              <div className='text-lg font-extrabold'>상담일시</div>
              <div className='text-lg'>{consultation.date}</div>
            </div>
            <div className='flex gap-3'>
              <div className='text-lg font-extrabold'>손님</div>
              <div className='text-lg'>{customerName}</div>
            </div>
          </div>

          <div className='flex gap-3 border-b border-hanaindigo border-b-3 pb-2'>
            <div className='text-lg font-extrabold'>제목</div>
            <div className='text-lg'>{consultation.title}</div>
          </div>

          <div className='flex gap-3 border-b border-hanaindigo border-b-3 pb-2 '>
            <div className='text-lg font-extrabold w-10'>내용</div>
            <div className='text-lg border border-hanaindigo border-opacity-40 min-h-32 max-h-60 p-2 overflow-auto flex-grow'>
              {consultation.content}
            </div>
          </div>


          <div className='flex justify-between'>
            <div className='flex gap-3'>
              <div className='text-lg font-extrabold'>첨부파일</div>
              <div className='text-lg'>(첨부파일명)</div>
            </div>

            <div className='flex gap-3'>
              <button className='text-lg font-extrabold'><LuDownload /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
