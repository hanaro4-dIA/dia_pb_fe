import { useEffect, useState } from 'react';

//커스텀훅을 빼고, 바로 넣었음. 추후에 수정 가능성 유
const APIKEY = import.meta.env.VITE_API_KEY;

export default function RequestContentPage({ id }: { id: string }) {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${APIKEY}journals/reserves/${id}/content`
        );
        const data = await response.text();
        setContent(data);
      } catch (err) {}
    };

    fetchData();
  }, [id]);

  return (
    <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
      <div className='flex flex-col w-full h-full '>
        {/* 상세보기 헤더 */}
        <div className='bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5'>
          요청내용 상세보기
        </div>

        {/* 상세 내용 표시 */}
        {content ? (
          <div className='h-full p-10 overflow-y-auto space-y-4 border-x border-b border-gray-200 text-hanaindigo'>
            {content}
          </div>
        ) : (
          <div className='h-full p-10 overflow-y-auto space-y-4 border-x border-b border-gray-200 text-hanaindigo text-sm'>
            요청 내용이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
