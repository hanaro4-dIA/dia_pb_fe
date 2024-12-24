import { useEffect, useState } from 'react';
import Section from '../components/Section';
import { Button } from '../components/ui/button';
import useFetch from '../hooks/useFetch';
import { type TScriptProps } from '../types/dataTypes';

export default function ConsultationScript({
  consultingId,
  isRefetch,
  setFetchFinished,
}: {
  consultingId: number;
  isRefetch: boolean;
  fetchFinished: boolean;
  setFetchFinished: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const APIKEY = import.meta.env.VITE_API_KEY;
  const [script, setScripts] = useState<TScriptProps[]>([]);
  const { data, error } = useFetch<{ scriptResponseDTOList: TScriptProps[] }>(
    `journals/${consultingId}/scripts?x=${isRefetch}`
  );
  const handleContentChange = async (scriptId: number, newContent: string) => {
    setScripts((prevScript) =>
      prevScript.map((item) =>
        item.scriptId === scriptId ? { ...item, content: newContent } : item
      )
    );
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.scriptResponseDTOList?.length) {
      setScripts(data.scriptResponseDTOList);
      if (setFetchFinished) setFetchFinished(true);
    }
  }, [data, isRefetch, setFetchFinished]);

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

  const transScript = async (script: TScriptProps[]) => {
    const scriptRequestDTOList = script.map((item) => ({
      scriptId: item.scriptId,
      scriptSequence: item.scriptSequence,
      speaker: item.speaker,
      content: item.content,
    }));

    const response = await fetch(
      `${APIKEY}journals/${consultingId}/transcripts`,
      {
        method: 'PUT',
        body: JSON.stringify({ scriptRequestDTOList }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const responseBody = await response.json(); // JSON 응답 읽기

    if (!response.ok) {
      throw new Error(
        `Failed with status ${response.status}: ${responseBody.message}`
      );
    }
  };

  return (
    <Section title='상담 스크립트' layoutClassName='h-full'>
      <div className='h-full p-2 flex flex-col justify-between'>
        {/* 텍스트 입력 영역 (말풍선 형식) speaker에 따라 justify css 다르게 적용*/}
        <div className='relative flex flex-col overflow-y-auto space-y-2'>
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
        </div>

        {/* 적용 버튼 */}
        <div className='flex justify-end'>
          <Button
            className='bg-hanaindigo w-20 px-2 rounded-xl'
            onClick={() => {
              transScript(script);
            }}
          >
            적용
          </Button>
        </div>
      </div>
    </Section>
  );
}
