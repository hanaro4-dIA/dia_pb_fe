import { useEffect, useState } from 'react';
import Section from '../components/Section';
import { Button } from '../components/ui/button';
import useFetch from '../hooks/useFetch';
import { TScriptProps } from '../types/dataTypes';

export default function ConsultationScript({
  consultingId,
}: {
  consultingId: number;
}) {
  const [script, setScripts] = useState<TScriptProps[]>([]);
  const { data, error } = useFetch<{ scriptResponseDTOList: TScriptProps[] }>(
    `journals/${consultingId}/scripts`
  );

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        if (data) {
          setScripts(data.scriptResponseDTOList);
        }
      } catch (error) {
        console.error('상담 스크립트 불러오기 중 에러 발생: ', error);
      }
    };
    fetchScripts();
  }, [data]);

  const handleContentChange = (scriptId: number, newContent: string) => {
    setScripts((prevScript) =>
      prevScript.map((item) =>
        item.scriptId === scriptId ? { ...item, content: newContent } : item
      )
    );
  };

  const handleInputResize = (textarea: HTMLTextAreaElement) => {
    if (textarea) {
      textarea.style.height = 'auto'; // 높이를 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 텍스트 크기에 맞게 설정
    }
  };

  return (
    <Section title='상담 스크립트' layoutClassName='h-full'>
      <div className='h-full p-2 flex flex-col justify-between'>
        {/* 텍스트 입력 영역 (말풍선 형식) speaker에 따라 justify css 다르게 적용*/}
        <div className='relative flex flex-col overflow-y-auto space-y-2'>
          {script.map((item) => (
            <div
              key={item.scriptId}
              className={`flex items-center ${
                item.speaker === 'VIP' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`rounded-lg p-2 ${item.speaker === 'VIP' ? 'bg-blue-100' : 'bg-gray-100'}`}
              >
                <textarea
                  className='w-full bg-transparent outline-none resize-none overflow-hidden text-sm'
                  rows={1}
                  placeholder='메시지를 입력하세요'
                  value={item.content}
                  onChange={(e) => {
                    handleContentChange(item.scriptId, e.target.value);
                    handleInputResize(e.target);
                  }}
                  ref={(textarea) => {
                    if (textarea) {
                      handleInputResize(textarea);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 적용 버튼 */}
        <div className='flex justify-end'>
          <Button className='bg-hanaindigo w-20 px-2 rounded-xl'>적용</Button>
        </div>
      </div>
    </Section>
  );
}
