import { IoMdSearch } from 'react-icons/io';
import { useState } from 'react';

// DB 리스트 타입 지정
type DBItem = {
  id: number;
  title: string;
  writer: string;
  makeDay: string;
  url: string;
  content: string;
};

// DB 목록
const dbList: DBItem[] = [
  {
    id: 1,
    title: '경기 청년 지원 대출',
    writer: '안유진',
    makeDay: '2024.01.02 16:02',
    url: 'http://www.naver.com/',
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
    id: 2,
    title: '국민취업지원제도',
    writer: '손흥민',
    makeDay: '2024.01.02 16:02',
    url: 'http://www.google.com/',
    content: '내용 첨부',
  },
];

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [selectedItem, setSelectedItem] = useState<DBItem | null>(null); // 선택된 항목 상태

  // 검색어에 따라 DB 목록을 필터링하는 함수
  const filteredDBList = dbList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
      {/* 왼쪽 목록 영역 */}
      <div className='flex flex-col flex-grow w-2/5 h-full'>
        <div className='overflow-y-auto'>
          <div className='flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200'>
            {/* 헤더 */}
            <div className='bg-hanaindigo text-[#fff] text-[1.5rem] font-extrabold p-4 pl-5 rounded-t-lg'>
              키워드 DB 목록
            </div>

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
            <div className='mt-2 p-4 overflow-auto'>
              {filteredDBList.map((item) => (
                <div
                  key={item.id}
                  className='mb-4'
                  onClick={() => setSelectedItem(item)}
                >
                  <div className='bg-[#fff] rounded-lg p-4 border shadow-lg cursor-pointer'>
                    {/* 키워드 이름 */}
                    <div className='text-black text-lg font-bold'>
                      {item.title}
                    </div>

                    {/* 키워드 내용 */}
                    <div className='bg-hanaindigo text-[#fff] p-2 mt-2 rounded-lg'>
                      <div
                        className='overflow-hidden text-ellipsis whitespace-nowrap'
                        style={{ maxWidth: '100%' }}
                      >
                        {item.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 상세보기 영역 */}
      <div className='flex flex-col flex-grow w-3/5 h-full'>
        <div className='relative flex flex-col w-full h-full border shadow-lg border-gray-200 rounded-lg'>
          {/* 상세보기 헤더 */}
          <div className='bg-hanaindigo text-white text-[1.5rem] font-extrabold p-4 rounded-t-lg pl-5'>
            상세보기
          </div>

          {/* 상세 내용 표시 */}
          {selectedItem ? (
            <div className='p-10 space-y-4  overflow-y-auto'>
              <div className='text-4xl font-bold'>{selectedItem.title}</div>
              <div className='flex justify-between'>
                <div className='flex gap-3'>
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
              <div className='flex gap-3'>
                <div className='text-lg font-extrabold'>상세URL </div>
                <div className='text-lg '>
                  <a
                    href={selectedItem.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {selectedItem.url}
                  </a>
                </div>
              </div>
              <div className='text-3xl font-bold'>내용</div>
              <div className='mt-4 '>{selectedItem.content}</div>
            </div>
          ) : (
            <div className='m-5 flex justify-center text-lg'>
              키워드를 선택해 주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
