import { useEffect, useState } from 'react';
import mockupScript from '../assets/mockupScript.png';
import { type TCategoryProps } from '../types/dataTypes';
import { type TJournalsProps } from '../types/dataTypes';
import { type TCustomersProps } from '../types/dataTypes';

type TPbJournalsProps = {
  consultation: TJournalsProps;
};

export default function ReadJournalWindow({ consultation }: TPbJournalsProps) {
  const [categoryName, setCategoryName] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');

  // 카테고리 이름 불러오기 함수
  const fetchCategoryName = async (categoryId: number) => {
    try {
      const response = await fetch('/data/Category.json');
      const categoryData: TCategoryProps[] = await response.json();
      const category = categoryData.find(({ id }) => id === categoryId);

      if (category) {
        setCategoryName(category.name);
      }
    } catch (error) {
      alert('Error fetching category data:');
    }
  };

  // 손님 이름 불러오기 함수
  const fetchCustomerName = async (customerId: number) => {
    try {
      const response = await fetch('/data/Customers.json');
      const customerData: TCustomersProps[] = await response.json();
      const customer = customerData.find(({ id }) => id === customerId);

      if (customer) {
        setCustomerName(customer.name);
      }
    } catch (error) {
      alert('Error fetching customer data:');
    }
  };

  useEffect(() => {
    if (consultation.category_id) {
      fetchCategoryName(consultation.category_id);
    }
    if (consultation.customer_id) {
      fetchCustomerName(consultation.customer_id);
    }
  }, [consultation.category_id, consultation.customer_id]);

  return (
    <div className='flex items-start justify-center w-full h-full space-x-4 overflow-y-auto'>
      <div className='relative flex flex-col w-full h-full '>
        <div className='sticky top-0 bg-hanaindigo text-white text-[1.5rem] font-extrabold p-4 rounded-t-lg pl-5'>
          상담일지 자세히보기
        </div>

        <div className='p-10 space-y-4 flow-y-auto bg-white'>
          <div className='flex justify-between items-center border-b border-black py-1'>
            <label className='text-xs'>[상담 제목]</label>
            <div className='flex justify-between items-center text-sm font-bold w-[84%] pl-2 focus:outline-none rounded-xl'>
              <span>{consultation.title}</span>
            </div>
          </div>
          <div className='flex justify-start items-center border-b border-black py-1 space-x-2'>
            <div className='flex items-center justify-between w-1/2'>
              <label className='text-xs'>[카테고리]</label>
              <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                {categoryName}
              </div>
            </div>
            <div className='flex items-center justify-between w-1/2'>
              <label className='text-xs'>[상담일시]</label>
              <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                {consultation.date}
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-5'>
            <div>
              <span className='text-sm mb-3'>[PB의 기록]</span>
              <div className='w-full h-40 p-2 border resize-none overflow-y-auto'>
                {consultation.content}
              </div>
            </div>
            <div>
              <span className='text-sm mb-3'>[PB의 추천 상품]</span>
              <div className='w-full h-40 p-2 border resize-none overflow-y-auto'>
                {consultation.content}
              </div>
            </div>
            <div>
              <span className='text-sm mb-3'>[상담 스크립트]</span>
              <div className='flex justify-center w-full h-96 p-2 border resize-none overflow-y-auto'>
                <img src={mockupScript} alt='상담 내용' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
