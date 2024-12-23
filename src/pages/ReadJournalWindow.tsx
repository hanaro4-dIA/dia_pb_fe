import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import {
  ReadJournalWindowProps,
  TScriptResponseProps,
} from '../types/componentTypes';
import changeDateFormat from '../utils/changeDateFormat-util';

export default function ReadJournalWindow({
  consultation,
}: ReadJournalWindowProps) {
  const {
    id,
    consultTitle,
    categoryName,
    consultDate,
    contents,
    journalProducts,
  } = consultation;

  const {
    data: scriptData = { scriptResponseDTOList: [] },
    error: scriptError,
  } = useFetch<TScriptResponseProps>(`journals/${id}/scripts`);

  useEffect(() => {
    if (scriptError) {
      console.error('스크립트 데이터 조회 중 발생한 에러: ', scriptError);
    }
  }, [scriptError]);

  return (
    <div className='flex items-start justify-center w-full h-full space-x-4 overflow-y-auto'>
      <div className='relative flex flex-col w-full h-full '>
        <div className='sticky top-0 bg-hanaindigo text-white text-[1.5rem] font-extrabold p-4 rounded-t-lg pl-5'>
          상담일지 자세히보기
        </div>
        <div className='p-10 space-y-4 flow-y-auto bg-white'>
          <div className='flex justify-between items-center border-b border-black py-1'>
            <label className='text-xs'>[상담 제목]</label>
            <div
              className='flex justify-between items-center text-sm w-[84%] pl-2 focus:outline-none rounded-xl'
              style={{ fontFamily: 'noto-bold, sans-serif' }}
            >
              <span>{consultTitle}</span>
            </div>
          </div>
          <div className='flex justify-start items-center border-b border-black py-1 space-x-2'>
            <div className='flex items-center justify-between w-1/2'>
              <label className='text-xs'>[카테고리]</label>
              <div
                className='text-sm w-2/3 px-2 focus:outline-none rounded-xl'
                style={{ fontFamily: 'noto-bold, sans-serif' }}
              >
                {categoryName}
              </div>
            </div>
            <div className='flex items-center justify-between w-1/2'>
              <label className='text-xs'>[상담일시]</label>
              <div
                className='text-sm w-2/3 px-2 focus:outline-none rounded-xl'
                style={{ fontFamily: 'noto-bold, sans-serif' }}
              >
                {changeDateFormat(consultDate)}
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-5'>
            <div>
              <div className='text-sm mb-2'>[PB의 기록]</div>
              <div className='w-full h-40 p-2 border resize-none overflow-y-auto text-sm'>
                {contents}
              </div>
            </div>
            <div>
              <div className='text-sm mb-2'>[PB의 추천 상품]</div>
              <div className='w-full h-40 p-2 border resize-none overflow-y-auto'>
                {journalProducts?.map((product, index) => (
                  <div key={index} className='flex space-x-4 mb-2'>
                    <a
                      href={product.productUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 text-sm flex space-x-2'
                    >
                      <img
                        src={product.productImageUrl}
                        alt={product.productName}
                        className='w-30 h-16 object-cover'
                      />
                      <div className='flex flex-col justify-center'>
                        {product.productName}
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className='text-sm mb-2'>[상담 스크립트]</div>
              <div className='chat-container w-full p-4 border rounded-lg overflow-y-auto space-y-3 bg-gray-100'>
                {scriptData?.scriptResponseDTOList ? (
                  scriptData.scriptResponseDTOList.map((script) => (
                    <div
                      key={script.scriptId}
                      className={`chat-message flex ${
                        script.speaker === 'PB'
                          ? 'justify-start'
                          : 'justify-end'
                      }`}
                    >
                      <div
                        className={`chat-bubble max-w-[60%] p-3 rounded-xl shadow-md ${
                          script.speaker === 'PB'
                            ? 'bg-indigo-200 text-black rounded-bl-none'
                            : 'bg-gray-200 text-black rounded-br-none'
                        }`}
                      >
                        <p className='text-sm font-medium'>{script.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>스크립트 데이터를 불러오는 중입니다...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
