import { createRoot } from 'react-dom/client';
import Section from '../components/Section';
import { Button } from '../components/ui/button';
import RequestContentPage from '../pages/RequestContentPage';

type SecondComponentProps = {
  selectedText: string;
};

export default function MakeJournal({ selectedText }: SecondComponentProps) {
  // 요청내용 상세보기
  const openNewWindow = () => {
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
        root.render(<RequestContentPage />);
      }
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
                defaultValue='빠른 상담 요청'
                type='text'
                maxLength={50}
                className='text-sm flex-grow focus:outline-none'
              />
              <button
                onClick={openNewWindow}
                className='border border-hanaindigo px-2 py-1 rounded text-xs'
              >
                자세히보기
              </button>
            </div>

            <div className='flex justify-start items-center border-b border-black py-1 space-x-2'>
              <div className='flex items-center space-x-3 w-1/3'>
                <label className='text-xs'>[카테고리]</label>
                <select name='category' id='category' className='text-sm'>
                  <option value='quick'>빠른상담</option>
                  <option value='silver'>은퇴설계</option>
                  <option value='asset'>자산관리</option>
                  <option value='care'>주거/케어</option>
                  <option value='life'>라이프</option>
                </select>
              </div>
              <div className='flex items-center space-x-3 w-1/3'>
                <label className='text-xs'>[담당PB]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  조경은 PB
                </div>
              </div>
              <div className='flex items-center space-x-3 w-1/3'>
                <label className='text-xs'>[상담일시]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  2024.12.01 13:50
                </div>
              </div>
            </div>
          </div>

          {/* 작성란 */}
          <div className='flex flex-col space-y-10 h-full'>
            <div className='h-2/5'>
              <span className='text-sm mb-3'>[PB의 기록]</span>
              <textarea
                value={selectedText}
                className='w-full h-full p-2 border resize-none overflow-y-auto focus:outline-hanasilver'
              />
            </div>
            <div className='h-2/5'>
              <span className='text-sm mb-3'>[PB의 추천 상품]</span>
              <textarea className='w-full h-full p-2 border resize-none overflow-y-auto focus:outline-hanasilver' />
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
            <Button className='bg-hanaindigo w-20 px-2 rounded-xl'>전송</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
