import { createRoot } from 'react-dom/client';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JournalProductInputArea from '../components/JournalProductInputArea';
import Section from '../components/Section';
import { Button } from '../components/ui/button';
import useFetch from '../hooks/useFetch';
import RequestContentPage from '../pages/RequestContentPage';
import { type TConsultationProps } from '../types/dataTypes';
import changeDateFormat from '../utils/changeDateFormat-util';

const APIKEY = import.meta.env.VITE_API_KEY;

export default function MakeJournal({ customerId }: { customerId: number }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const pbName = JSON.parse(localStorage.getItem('loginPB') || '{}').name;

  const { data, error } = useFetch<TConsultationProps[]>(
    `reserves?status=true&type=notcompleted`
  );
  const [, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    // WebSocket 연결 생성
    const newSocket = new WebSocket(`ws://localhost:8080/wss/journalkeyword`);

    newSocket.onopen = () => {
      console.log('WebSocket 연결 성공');
    };

    newSocket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        console.log('받은 데이터:', response);

        // ResponseListJournalKeywordDTO 구조에서 keywordDTOList 가져오기
        const journalKeywords = response.keywordDTOList;

        if (journalKeywords?.length > 0) {
          // 유효한 데이터 수신 시 처리
          const formattedContents = journalKeywords
            .map((keyword: any) => `${keyword.title}: ${keyword.content}`)
            .join('\n');

          setJournalContents(formattedContents);

          // 유효한 데이터 수신 후 WebSocket 연결 종료
          //console.log('유효한 데이터 수신, WebSocket 종료');
          //newSocket.close();
        } else {
          // 빈 데이터일 경우 연결 유지
          console.warn('빈 데이터 수신, WebSocket 연결 유지');
        }
      } catch (error) {
        console.error('WebSocket 메시지 파싱 오류:', error);
      }
    };

    newSocket.onclose = (event) => {
      console.log('WebSocket 연결 종료', event.reason);

      // 서버에서 의도적으로 연결을 닫았을 경우 재연결하지 않음
      if (!event.wasClean) {
        console.warn('비정상 종료. WebSocket 재연결 시도');
        setTimeout(() => {
          const retrySocket = new WebSocket(
            `ws://localhost:8080/ws/journalkeyword`
          );
          setSocket(retrySocket);
        }, 3000); // 3초 후 재연결 시도
      }
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket 연결 오류:', error);
      // 에러 발생 시 연결 재시도
      setTimeout(() => {
        const retrySocket = new WebSocket(
          `ws://localhost:8080/ws/journalkeyword`
        );
        setSocket(retrySocket);
      }, 3000);
    };

    setSocket(newSocket);

    // 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, []); // 빈 의존성 배열로 최초 마운트 시 한 번 실행

  useEffect(() => {
    if (error) {
      console.error('예약된 상담요청 가져오기 오류', error);
    }
  }, [error]);

  useEffect(() => {
    if (error)
      console.error(
        '상담페이지에서 해당 상담 불러오기 중 발생한 에러: ',
        error
      );
  }, [error]);

  const [categoryId, setCategoryId] = useState<number>(1);
  const [consultingTitle, setConsultingTitle] = useState<string | undefined>(
    undefined
  );
  const [journalContents, setJournalContents] = useState<string>('');
  const [recommendedProductsKeys, setRecommendedProductsKeys] = useState<
    number[]
  >([]);

  const [day, setDay] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const [recommendedProducts, setRecommendedProducts] = useState<
    { id: number; productName: string }[]
  >([]);

  useEffect(() => {
    const fetchTemporaryData = async () => {
      try {
        const response = await fetch(
          `${APIKEY}journals/${id}/status?complete=false`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (response.ok) {
          const tempData = await response.json();

          //setJournalContents(tempData.journalContents || '');
          const products = tempData.recommendedProduct?.map(
            (product: { id: number; productName: string }) => ({
              id: product.id,
              productName: product.productName,
            })
          );
          setRecommendedProducts(products || []);
          setRecommendedProductsKeys(
            products?.map((p: { id: number }) => p.id) || []
          );
        } else {
          console.error('임시 저장된 데이터를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('임시 저장된 데이터 요청 오류:', error);
      }
    };

    fetchTemporaryData();
  }, [id]);

  useEffect(() => {
    if (data) {
      const selectedConsultation = data.find(
        (consultation) => consultation.id === Number(id)
      );
      if (selectedConsultation) {
        setConsultingTitle(selectedConsultation.title);
        setCategoryId(Number(selectedConsultation.categoryId));
        setDay(changeDateFormat(selectedConsultation.hopeDate));
        setTime(selectedConsultation.hopeTime);
      }
    }
  }, [data, id]);

  const openNewWindow = (id: string) => {
    const newWindow = window.open('', '_blank', 'width=800, height=600');
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

    const isConfirmed = window.confirm('상담 스크립트를 적용하셨습니까?');
    if (!isConfirmed) {
      alert('상담 스크립트를 적용해주세요.');
      return;
    }

    const uniqueRecommendedProductsKeys = [...new Set(recommendedProductsKeys)];

    const requestBody = {
      consultingId: id,
      categoryId,
      consultingTitle,
      journalContents,
      recommendedProductsKeys: uniqueRecommendedProductsKeys,
    };

    try {
      const response = await fetch(`${APIKEY}journals/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert('상담 일지가 전송되었습니다.');
        navigate(`/customerDetail/${customerId}`);
      }
    } catch (error) {
      console.error('상담일지 전송 오류', error);
    }
  };

  const handleTemporarySave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isConfirmed = window.confirm('상담 스크립트를 적용하셨습니까?');
    if (!isConfirmed) {
      alert('상담 스크립트를 적용해주세요.');
      return;
    }

    const requestBody = {
      consultingId: id,
      categoryId,
      consultingTitle,
      journalContents,
      recommendedProductsKeys,
    };

    try {
      const response = await fetch(`${APIKEY}journals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert('상담 일지가 임시 저장되었습니다.');
      }
    } catch (error) {
      console.error('상담일지 임시 저장 오류', error);
    }
  };

  return (
    <Section title='상담일지 작성하기' layoutClassName='h-full'>
      <div className='p-3 h-full flex flex-col justify-between'>
        <div className='flex flex-col h-[90%] space-y-4'>
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
              {categoryId !== 1 && (
                <button
                  onClick={() => openNewWindow(id!)}
                  className='border border-hanaindigo px-2 py-1 rounded text-xs'
                >
                  자세히보기
                </button>
              )}
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
              <div className='flex justify-center items-center space-x-3 w-1/3'>
                <label className='text-xs'>[담당PB]</label>
                <div
                  className='text-sm px-2 focus:outline-none rounded-xl'
                  style={{ fontFamily: 'noto-bold, sans-serif' }}
                >
                  {pbName} PB
                </div>
              </div>
              <div className='flex justify-center items-center space-x-3 w-1/3'>
                <label className='text-xs'>[상담일시]</label>
                <div
                  className='text-sm w-2/3 px-2 focus:outline-none rounded-xl'
                  style={{ fontFamily: 'noto-bold, sans-serif' }}
                >
                  {day} {time}
                </div>
              </div>
            </div>
          </div>
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
              <JournalProductInputArea
                recommendedProducts={recommendedProducts}
                recommendedProductsKeys={recommendedProductsKeys}
                setRecommendedProductsKeys={setRecommendedProductsKeys}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-end'>
          <div>
            <form id='temporarySaveForm' onSubmit={handleTemporarySave}>
              <Button className='bg-hanasilver w-20 mr-5 px-2 rounded-xl'>
                임시저장
              </Button>
            </form>
          </div>
          <div>
            <form id='journalForm' onSubmit={handleSubmit}>
              <Button
                type='submit'
                className='bg-hanaindigo w-20 px-2 rounded-xl'
              >
                전송
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
