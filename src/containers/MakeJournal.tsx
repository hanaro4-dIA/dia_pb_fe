import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Section from '../components/Section';
import { Button } from '../components/ui/button';
import RequestContentPage from '../pages/RequestContentPage';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { TConsultationProps } from '../types/dataTypes';
const APIKEY = import.meta.env.VITE_API_KEY;

export default function MakeJournal() {
  const { id } = useParams();

  const { data, error } = useFetch<TConsultationProps[]>(`pb/reserves?status=true&type=upcoming`);
  if (error){
    console.error(error);
  }

  const [categoryId, setCategoryId] = useState<number>(1);
  const [consultingTitle, setConsultingTitle] = useState<string | undefined>(undefined);
  const [journalContents, setJournalContents] = useState<string>();
  const [recommendedProductsKeys, setRecommendedProductsKeys] = useState<number[]>([]);

  const [day, setDay] = useState<string>();
  const [time, setTime] = useState<string>();
  useEffect(() => {
    if (data) {
      const selectedConsultation = data.find((consultation) => consultation.id === Number(id));
      if (selectedConsultation) {
        setConsultingTitle(selectedConsultation.title);
        setCategoryId(selectedConsultation.categoryId);
        setDay(selectedConsultation.hopeDate);
        setTime(selectedConsultation.hopeTime?.slice(0, -3));
      }
    }
  }, [data, id]); 

  const openNewWindow = (id: string) => {
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    if (newWindow) {
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join('');
          } catch (e) {
            alert('Failed to load some CSS rules:');
            return '';
          }
        })
        .join('');
      newWindow.document.write(`
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>쪽지 자세히 보기</title>
        <style>${styles}</style>
        </head>
        <body>
        <div id="dictionary-root"></div>
        </body>
        </html>
      `);
      newWindow.document.close();
      
      const rootElement = newWindow.document.getElementById('dictionary-root');
      if (rootElement) {
        const root = createRoot(rootElement);
        root.render(<RequestContentPage id={id} />);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = {
      consultingId: id,
      categoryId,
      consultingTitle,
      journalContents,
      recommendedProductsKeys,
    };

    try {
      const response = await fetch(`${APIKEY}/pb/journals/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert('상담 일지가 전송되었습니다.');
      } 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Section title='상담일지 작성하기' layoutClassName='h-full'>
      <div className='p-3 h-full flex flex-col justify-between'>
        <div className='flex flex-col h-[90%] space-y-4'>
          {/* 상담요청 내용 관련 데이터 */}
          <div className='mb-3'>
            <div className='w-full flex items-center space-x-3 border-b border-black py-1'>
              <label className='text-xs'>[상담 제목]</label>
              <input
                value={consultingTitle}
                onChange={(e) => setConsultingTitle(e.target.value)}
                defaultValue={consultingTitle}
                type='text'
                maxLength={50}
                className='text-sm flex-grow focus:outline-none'
              />
              <button
                onClick={() => openNewWindow(id!)}
                className='border border-hanaindigo px-2 py-1 rounded text-xs'
              >
                자세히보기
              </button>
            </div>

            <div className='flex justify-start items-center border-b border-black py-1 space-x-2'>
              <div className='flex items-center space-x-3 w-1/3'>
                <label className='text-xs'>[카테고리]</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  name='category'
                  id='category'
                  className='text-sm'
                >
                  <option value={1}>빠른상담</option>
                  <option value={2}>은퇴설계</option>
                  <option value={3}>자산관리</option>
                  <option value={4}>주거/케어</option>
                  <option value={5}>라이프</option>
                </select>
              </div>
              <div className='flex items-center space-x-3 w-1/3'>
                <label className='text-xs'>[담당PB]</label>
                <div
                  className='text-sm w-2/3 px-2 focus:outline-none rounded-xl'
                  style={{ fontFamily: 'noto-bold, sans-serif' }}
                >
                  손흥민 PB
                </div>
              </div>
              <div className='flex items-center space-x-3 w-1/3'>
                <label className='text-xs'>[상담일시]</label>
                <div
                  className='text-sm w-2/3 px-2 focus:outline-none rounded-xl'
                  style={{ fontFamily: 'noto-bold, sans-serif' }}
                >
                  {day}  {time}
                </div>
              </div>
            </div>
          </div>

          {/* 작성란 */}
          <div className='flex flex-col space-y-10 h-full'>
            <div className='h-2/5 mb-4'>
              <div className='text-sm mb-3'>[PB의 기록]</div>
              <textarea
                value={journalContents}
                onChange={(e) => setJournalContents(e.target.value)}
                className='w-full h-full p-2 border resize-none text-sm overflow-y-auto focus:outline-hanasilver'
              />
            </div>
            <div className='h-2/5'>
              <div className='text-sm mb-3'>[PB의 추천 상품]</div>
              <textarea
                className='w-full h-full p-2 border resize-none text-sm overflow-y-auto focus:outline-hanasilver'
              />
            </div>
          </div>
        </div>

        {/* 최하단 버튼 */}
        <div className='flex justify-end'>
          <div>
            <Button className='bg-hanasilver w-20 mr-5 px-2 rounded-xl'>
              임시저장
            </Button>
          </div>
          <div>
            <form id="journalForm" onSubmit={handleSubmit}>
              <Button type="submit" className='bg-hanaindigo w-20 px-2 rounded-xl'>
                전송
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
