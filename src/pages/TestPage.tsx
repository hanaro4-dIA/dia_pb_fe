import Section from '../components/Section';

export default function TestPage() {
  return (
    <div className='flex space-x-4'>
      <Section
        title='손님목록'
        layoutClassName='w-full'
        children={
          <>
            <div className='text-center text-hanaindigo text-xl'>
              기본 section
            </div>
          </>
        }
      ></Section>
      <Section
        pbProfile={false}
        logoImg={true}
        title='전체 상담 일정'
        arrowToggle={false}
        layoutClassName='w-full'
        children={
          <>
            <div className='text-center text-hanaindigo text-xl'>
              logo 이미지 추가
            </div>
          </>
        }
      ></Section>
      <Section
        pbProfile={false}
        logoImg={false}
        title='손님정보'
        arrowToggle={true}
        layoutClassName='w-full'
        children={
          <>
            <div className='text-center text-hanaindigo text-xl'>
              arrowDown 토글 추가
            </div>
          </>
        }
      ></Section>
      <Section
        pbProfile={true}
        logoImg={false}
        title='PB 내 프로필'
        arrowToggle={false}
        layoutClassName='w-full'
        children={
          <>
            <div className='text-center text-hanaindigo text-xl'>PB 프로필</div>
          </>
        }
      ></Section>
    </div>
  );
}
