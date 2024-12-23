import Section from '../components/Section';
import { Button } from '../components/ui/button';

export default function ConsultationScript() {
  return (
    <Section title='상담 스크립트' layoutClassName='h-full'>
      <div className='h-full p-2 flex flex-col justify-between'>
        {/* 텍스트 입력 영역 (말풍선 형식) */}
        <div className='relative flex flex-col overflow-y-auto space-y-2'>
          <div className='flex items-center justify-start'>
            <div className='bg-blue-100 rounded-lg p-2 max-w-[60%]'>
              <input
                type='text'
                className='w-full bg-transparent outline-none'
                placeholder='메시지를 입력하세요'
              />
            </div>
          </div>
          {/* 다른 사용자의 말풍선 (선택적으로 추가 가능) */}
          <div className='flex items-center justify-end'>
            <div className='bg-gray-100 rounded-lg p-2 max-w-[60%]'>
              <input
                type='text'
                className='w-full bg-transparent outline-none'
                placeholder='답변을 입력하세요'
              />
            </div>
          </div>
        </div>

        {/* 적용 버튼 */}
        <div className='flex justify-end'>
          <Button className='bg-hanaindigo w-20 px-2 rounded-xl'>적용</Button>
        </div>
      </div>
    </Section>
  );
}
