// import { Button } from '../components/ui/button';

// export default function Stt(){


//     return(
//         <>
//             <div className='relative flex flex-col w-full border shadow-lg border-gray-200 rounded-lg '>    
//                 <div className='bg-hanaindigo text-[#fff] text-[1.5rem] font-extrabold p-4 rounded-t-lg pl-5'>
//                 STT 자동 작성란
//                 </div>
                
//                 <div className='h-full w-full p-2'>
//                 <textarea className='h-full w-full border resize-none min-h-[800px]'></textarea>
//                 </div>
//                 <div className='absolute bottom-0 right-6 mb-6'>
//                 <Button className='bg-hanaindigo'>저장</Button>
//                 </div>
//             </div>
//           </>
//     )
// }

import { Button } from '../components/ui/button';

export default function Stt() {
  return (
    <div className="relative flex flex-col w-full h-[calc(100vh-5rem)] border shadow-lg border-gray-200 rounded-lg">
      {/* 헤더 */}
      <div className="bg-hanaindigo text-white text-[1.5rem] font-extrabold p-4 rounded-t-lg pl-5">
        STT 자동 작성란
      </div>

      {/* 텍스트 입력 영역 */}
      <div className="flex-1 p-3 overflow-y-auto">
        <textarea
          className="h-full w-full border resize-none rounded-lg p-2 focus:outline-none"
          style={{ minHeight: 'calc(100vh - 14rem)' }}
        ></textarea>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end p-3">
        <Button className="bg-hanaindigo">저장</Button>
      </div>
    </div>
  );
}
