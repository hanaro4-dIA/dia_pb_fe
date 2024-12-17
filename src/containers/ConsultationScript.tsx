import Section from '../components/Section';
import { Button } from '../components/ui/button';

export default function ConsultationScript() {
  return (
    <Section title='상담 스크립트' layoutClassName='h-full'>
      <div className='h-full p-2 flex flex-col justify-between'>
        {/* 텍스트 입력 영역 */}
        <div className='relative flex overflow-y-auto'>
          <textarea className='h-full w-full resize-none rounded-lg p-2 focus:outline-none min-h-[calc(100vh-14rem)]' />
        </div>

        <div className='flex justify-end'>
          <Button className='bg-hanaindigo w-20 px-2 rounded-xl'>적용</Button>
        </div>
      </div>
    </Section>
  );
}
