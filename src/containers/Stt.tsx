import { useRef, useState } from 'react';
import Section from '../components/Section';
import { Button } from '../components/ui/button';

type ButtonType = { id: number; text: string; top: number; left: number };
type TextareaButtonConverterProps = {
  onTextSelect: (text: string) => void;
};

export default function STT({ onTextSelect }: TextareaButtonConverterProps) {
  const [text, setText] = useState('');
  const [buttons, setButtons] = useState<ButtonType[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [_, setTextareaValue] = useState('');

  const buttonSpacing = 8; // 원하는 간격을 지정하세요 (단위: px)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // 입력된 단어를 버튼으로 변환
      const lines = text.split('\n');
      const currentLineText = lines[lines.length - 1].trim();

      if (currentLineText) {
        // `textarea`의 현재 스크롤 위치를 기준으로 버튼의 위치 계산
        const textarea = textareaRef.current;
        if (textarea) {
          const { scrollTop, scrollLeft } = textarea;
          const lineHeight = 24; // 줄 높이를 조절하세요.
          const top =
            (lines.length - 1) * lineHeight +
            buttons.length * buttonSpacing -
            scrollTop;
          const left = 0 - scrollLeft;

          setButtons([
            ...buttons,
            { id: buttons.length, text: currentLineText, top, left },
          ]);

          // 버튼이 생성된 후 텍스트는 다음 줄로 초기화
          setText(text + '\n');
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setTextareaValue(e.target.value);
  };

  const handleButtonClick = (text: string) => {
    onTextSelect(text); // 부모로 텍스트 전달
  };

  return (
    <Section title='STT 자동 작성란' layoutClassName='h-full'>
      <div className='h-full p-2 flex flex-col justify-between'>
        {/* 텍스트 입력 영역 */}
        <div className='relative flex overflow-y-auto'>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='STT 입력'
            className='h-full w-full resize-none rounded-lg p-2 focus:outline-none min-h-[calc(100vh-14rem)]'
          />

          {/* 입력된 단어를 기반으로 생성된 버튼 */}
          <div className='absolute left-0 top-0 p-2 w-full'>
            {buttons.map((button) => (
              <button
                key={button.id}
                className='bg-blue-500 text-white px-3 py-1 rounded absolute'
                onClick={() => handleButtonClick(button.text)}
                style={{
                  top: `${button.top}px`,
                  left: `${button.left}px`,
                  marginBottom: `${buttonSpacing}px`,
                }}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>

        <div className='flex justify-end'>
          <Button className='bg-hanaindigo w-20 px-2 rounded-xl'>저장</Button>
        </div>
      </div>
    </Section>
  );
}
