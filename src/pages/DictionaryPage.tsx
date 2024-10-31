import { IoMdSearch } from 'react-icons/io';
import { useState } from 'react';

// DB 리스트 타입 지정
type TDBItemProps = {
  id: number;
  title: string;
  writer: string;
  makeDay: string;
  url: string;
  content: string;
};

// DB 목록
const dbList: TDBItemProps[] = [
  {
    id: 1,
    title: '소비자물가지수',
    writer: '안유진',
    makeDay: '2024.01.02 16:02',
    url: 'http://www.google.com/',
    content: '미국소비자물가지수(CPI)는 미국 고용통계국(U.S. Bureau of Labor Statistics)에서 매월 발표하는 지수로써, 미국 전체 및 세부 지역 별로 소비재 및 서비스 시장에 대해 도시 소비자가 지불하는 가격의 시간 경과에 따른 평균 변화를 측정 한 것입니다. 소비자물가지수가 상승할 경우 가계의 실질임금은 감소한다는 의미로써, 인플레이션의 변동을 측정하는 중요한 지수로 판단할 수 있습니다. ',
  },
  {
    id: 2,
    title: '데드 캣 바운스',
    writer: '손흥민',
    makeDay: '2024.01.02 16:02',
    url: 'http://www.google.com/',
    content: '데드 캣 바운스(영어: Dead cat bounce)는 주식 투자 용어이다. 주가가 급락 후 임시로 소폭 회복된 것을 의미한다. 즉 폭락장 가운데서도 가끔 주가가 튀어오르는 것을 죽은 고양이가 꿈틀한다는 식으로 표현한 것이다. "높은 곳에서 떨어 뜨리면 죽은 고양이도 튀어오른다."(Even a dead cat will bounce if it falls from a great height) 라는 월 가에서 유래한 문장이 시초이다.',
  },
  {
    id: 3,
    title: 'FOMC',
    writer: '손흥민',
    makeDay: '2024.01.02 16:02',
    url: 'http://www.google.com/',
    content: 'FOMC는 미국 정부의 금융 정책을 결정하는 최고 의사결정 기관이다. 공개시장활동을 감독하여 국가통화정책의 중요한 도구로 사용된다. 미국의 중앙은행이라 할 수 있는 FRB(연방준비제도)의 이사 7명과 지역별 연방준비은행 총재 5명으로 구성되어 있다. 정기적으로 약 6주마다 연 8회 회의를 개최하며, 필요에 따라 수시로 개최되기도 한다. 성명은 FOMC 최종 개최일(동부 표준시 오후 2시 15분경)에 공표되며, 의사결정 요지는 정책 결정일(FOMC 최종 개최일)로부터 3주 후에 발표된다. 시장 관계자들에게는 회의 결과는 향후 미국 연방 정부의 금융 정책을 예상할 수 있는 단서가 된다.',
  },
  {
    id: 4,
    title: 'Happy',
    writer: 'DAY6',
    makeDay: '2024.01.02 16:02',
    url: 'http://www.google.com/',
    content: `그런 날이 있을까요?
              마냥 좋은 그런 날이요
              내일 걱정 하나 없이
              웃게 되는 그런 날이요
              뭔가 하나씩은
              걸리는 게 생기죠
              과연 행복할 수 있을까요
              그런 날이 있을까요?
              꿈을 찾게 되는 날이요
              너무 기뻐 하늘 보고
              소리를 지르는 날이요
              뭐 이대로 계속해서
              버티고 있으면 언젠가
              그런 날이 올까요
              May I be happy?
              매일 웃고 싶어요
              걱정 없고 싶어요
              아무나 좀 답을 알려주세요
              So help me
              주저앉고 있어요
              눈물 날 것 같아요
              그러니까 제발 제발 제발요
              Tell me it's okay to be happy
              알고리즘엔 잘된 사람만
              수도 없이 뜨네요
              뭐 이대로 계속해서
              살아만 있으면 언젠가
              저런 날이 올까요
              May I be happy?
              매일 웃고 싶어요
              걱정 없고 싶어요
              아무나 좀 답을 알려주세요
              So help me
              주저앉고 있어요
              눈물 날 것 같아요
              그러니까
              Tell me it's okay to be happy
              그냥 쉽게 쉽게 살고 싶은데
              내 하루하루는 왜 이리
              놀라울 정도로 어려운 건데
              May I be happy?
              매일 웃고 싶어요
              걱정 없고 싶어요
              아무나 좀 답을 알려주세요
              So help me
              주저앉고 있어요
              눈물 날 것 같아요
              그러니까 제발 제발 제발요
              Tell me it's okay to be happy`,
  },
  {
    id: 5,
    title: '금리',
    writer: '손흥민',
    makeDay: '2024.01.02 16:02',
    url: 'http://www.google.com/',
    content: '내용 첨부',
  },
  {
    id: 6,
    title: '보험',
    writer: '손흥민',
    makeDay: '2024.01.02 16:02',
    url: 'http://www.google.com/',
    content: '내용 첨부',
  },
];

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [selectedItem, setSelectedItem] = useState<TDBItemProps>(); // 선택된 항목 상태

  // 검색어에 따라 DB 목록을 필터링하는 함수
  const filteredDBList = dbList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
      {/* 왼쪽 목록 영역 */}
      <div className='flex flex-col flex-grow w-1/4 h-full'>
        <div className='overflow-auto'>
          <div className='flex flex-col h-full bg-white '>
            {/* 헤더 */}
            <div className='bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg'>
              키워드 DB 목록
            </div>
            <div className='overflow-auto border-x border-b border-gray-200'>
              {/* 검색 입력 필드 */}
              <div className='flex justify-center mt-4'>
                <div className='relative w-11/12'>
                  <input
                    type='text'
                    placeholder='키워드 검색'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full h-[2.5rem] bg-white/60 rounded-lg border border-hanaindigo pl-4'
                  />
                  <IoMdSearch className='absolute right-4 top-1/2 transform -translate-y-1/2 text-hanaindigo' />
                </div>
              </div>

              {/* 필터링된 키워드 목록 */}
              <div className='mt-2 p-4'>
                {filteredDBList.map((item) => (
                  <div
                    key={item.id}
                    className='mb-4'
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className='bg-white rounded-lg p-4 border shadow-lg cursor-pointer'>
                      {/* 키워드 이름 */}
                      <div className='text-black text-base font-bold'>
                        {item.title}
                      </div>

                      {/* 키워드 내용 */}
                      <div className='bg-hanaindigo text-white p-2 mt-2 rounded-lg'>
                        <div className='truncate w-full'>{item.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 상세보기 영역 */}
      <div className='flex flex-col flex-grow w-full h-full'>
        <div className='relative flex flex-col w-full h-full '>
          {/* 상세보기 헤더 */}
          <div className='bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5'>
            상세보기
          </div>

          {/* 상세 내용 표시 */}
          {selectedItem ? (
            <div className='h-full p-10 space-y-4 overflow-y-auto border-x border-b border-gray-200'>
              <div className='text-4xl font-bold'>{selectedItem.title}</div>
              <div className='flex justify-between border-b border-black border-b-3 pb-2'>
                <div className='flex gap-3 '>
                  <div className='text-lg font-extrabold'>작성자 </div>
                  <div className='text-lg'>{selectedItem.writer}</div>
                </div>
                <div className='flex gap-3'>
                  <div className='text-lg font-extrabold'>
                    최근 업데이트 날짜{' '}
                  </div>
                  <div className='text-lg'>{selectedItem.makeDay}</div>
                </div>
              </div>
              <div className='flex gap-3 border-b border-black border-b-3 pb-2'>
                <div className='text-lg font-extrabold'>상세URL </div>
                <div className='text-lg '>
                  <a
                    href={selectedItem.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 underline'
                  >
                    {selectedItem.url}
                  </a>

                </div>
              </div>
              <div className='text-3xl font-bold'>내용</div>
              <div className='mt-4 '>{selectedItem.content}</div>
            </div>
          ) : (
            <div className='p-10 space-y-4 border-x border-b border-gray-200 text-center text-hanaindigo text-xl h-full'>
              키워드를 선택해 주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
