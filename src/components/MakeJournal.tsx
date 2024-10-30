import { Button } from './ui/button';

type SecondComponentProps = {
  selectedText: string;
};

export default function MakeJournal({ selectedText }: SecondComponentProps) {
  return (
    <div className='flex flex-col border shadow-lg border-gray-200 w-full h-full rounded-t-lg'>
      <div className='bg-hanaindigo text-white text-[1.5rem] font-extrabold p-3 rounded-t-lg pl-5'>
        상담일지 작성하기
      </div>

      <div className='p-3 border h-full flex flex-col justify-between'>
        <div className='flex flex-col h-[90%] space-y-3 mb-2'>
          {/* 상담요청 내용 관련 데이터 */}
          <>
            <div className='flex justify-between items-center border-b border-black py-1'>
              <label className='text-xs'>[상담 제목]</label>
              <div className='text-sm font-bold w-[84%] px-2 focus:outline-none rounded-xl'>
                제목!!!!!!
              </div>
            </div>
            <div className='flex justify-start items-center border-b border-black py-1 space-x-2'>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[카테고리]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  카테고리
                </div>
              </div>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[손님]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  손님이름
                </div>
              </div>
            </div>
            <div className='flex justify-start items-center border-b border-black py-1 space-x-2'>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[담당PB]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  담당 PB 이름
                </div>
              </div>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[상담일]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  상담일
                </div>
              </div>
            </div>
            <div className='flex justify-between items-center border-b border-black py-1'>
              <label className='text-xs'>[요청 내용]</label>
              <div className='text-sm font-bold w-[84%] px-2 focus:outline-none rounded-xl'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus, aperiam reprehenderit iusto similique fugiat
                pariatur deleniti nemo a enim doloremque at earum commodi,
                eveniet dolorum cum quas illo minima inventore est nam
                provident. Quis voluptate tempore, in molestiae molestias odio
                quos aspernatur! Laboriosam atque dicta ducimus, ut aliquam,
                consequatur iste maiores maxime, dolores et natus perspiciatis
                eum facere explicabo dignissimos autem asperiores soluta?
                Quisquam, consequatur consequuntur, sunt esse deleniti molestiae
                assumenda ipsum natus dicta provident modi amet dignissimos
                doloremque aut delectus, alias sequi nostrum quidem possimus.
                Deleniti quod sunt placeat mollitia voluptatum velit omnis vero
                assumenda minus tempore neque soluta in perspiciatis doloribus
                molestiae debitis optio quia reprehenderit, architecto minima
                qui necessitatibus nulla? Dignissimos doloremque iusto
                laudantium, hic saepe labore minima quidem iste numquam,
                repellat perspiciatis nulla? Non doloribus perspiciatis eveniet
                laborum voluptates, harum culpa in excepturi quam debitis
                placeat laboriosam, blanditiis asperiores aperiam! Iusto maiores
                magnam architecto, magni impedit asperiores provident non
                accusamus eos, repudiandae, saepe illum voluptates? Placeat odio
                quas sunt cumque commodi, molestias natus ut laboriosam animi
                aliquam optio libero! Et, veniam. Minima ipsa libero fugit
                iusto, deleniti possimus a alias tempore veniam, quae quasi
                ducimus. Culpa fugit eum quos quaerat quo neque illo sed ad
                aliquam, ipsam in id dignissimos laboriosam reiciendis!
                Reprehenderit magni voluptatibus nemo perferendis dolorem optio,
                obcaecati molestiae tempora expedita. Non accusamus
                reprehenderit consequuntur nesciunt! Facere, hic, quam fugit
                dolorum, fugiat voluptas obcaecati reiciendis quis sit omnis
                provident velit natus aspernatur. Corrupti cumque dicta totam
                numquam in suscipit alias similique iusto. Voluptates modi ullam
                ratione quam pariatur, quae consectetur? Earum nulla quidem
                labore odit temporibus modi, ab provident sit consequatur
                laudantium placeat, dolor assumenda laborum. Cupiditate quas
                perspiciatis illo libero sequi totam autem hic aspernatur
                dolorum similique quaerat tempore maiores itaque voluptate optio
                esse ullam, ea ab! Officiis, ab. Quam facere nam repellendus!
              </div>
            </div>
          </>

          <div className=' flex flex-col flex-grow overflow-y-auto'>
            {/* 도큐먼트 작성란 */}
            <div className='h-1/3 mb-3'>
              <span className='text-sm mb-2'>[PB의 기록]</span>

              <textarea
                value={selectedText}
                className='w-full h-[90%] p-2 border resize-none overflow-y-auto focus:outline-hanasilver'
              />
            </div>

            {/* 추천 상품 */}
            <div className='h-1/3 mb-3'>
              <span className='text-sm mb-2'>[PB의 추천 상품]</span>
              <textarea className='w-full h-[90%] p-2 border resize-none overflow-y-auto focus:outline-hanasilver' />
            </div>

            {/* 스크립트 기입란 */}
            <div className='h-1/3 mb-3'>
              <span className='text-sm mb-2'>[상담 스크립트]</span>
              <textarea className='w-full h-[90%] p-2 border resize-none overflow-y-auto focus:outline-hanasilver' />
            </div>
          </div>
        </div>

        <div className='flex items-center mb-2 '>
          <span className='text-xs mr-2'>[첨부파일]</span>
          <input type='file' className='text-xs' />
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
    </div>
  );
}
