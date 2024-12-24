// @ts-ignore
import MicRecorder from 'mic-recorder-to-mp3';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import ConsultationJournalList from '../containers/ConsultationJournalList';
import ConsultationScript from '../containers/ConsultationScript';
import CustomerInformation from '../containers/CustomerInformation';
import MakeJournal from '../containers/MakeJournal';
import useFetch from '../hooks/useFetch';
import { type TCustomerProps } from '../types/dataTypes';

export default function ConsultingPage() {
  const location = useLocation();
  const { customerId } = location.state || {};
  const { consultingId } = location.state || {};

  const { data, error } = useFetch<TCustomerProps>(
    `customers/list/${customerId}`
  );

  const [customerData, setCustomerData] = useState<TCustomerProps | null>(null);

  useEffect(() => {
    if (data) setCustomerData(data);
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error('손님 한 명 정보 조회 중 발생한 에러: ', error);
    }
  }, [error]);

  // 통화 녹음

  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (
        selectedFile.type === 'audio/mp3' ||
        selectedFile.name.endsWith('.mp3')
      ) {
        setFile(selectedFile);
        setUploadStatus(''); // 상태 초기화
      } else {
        alert('오직 .mp3 파일만 업로드할 수 있습니다.');
        e.target.value = ''; // 파일 선택 초기화
      }
    }
  };

  // 파일 업로드 핸들러
  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('uploadFile', file);
    try {
      setUploadStatus('업로드 중...');
      // fetch를 사용하여 파일 업로드
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}journals/${consultingId}/transcripts`,
        {
          method: 'POST',
          body: formData, // FormData를 직접 전송
          credentials: 'include',
        }
      );

      if (response.ok) {
        const data = await response.json(); // 서버 응답을 JSON으로 변환
        setUploadStatus('업로드 성공!');
        console.log('서버 응답:', data);
      } else {
        throw new Error(`서버 에러: ${response.status}`);
      }
    } catch (error) {
      console.error('업로드 실패:', error);
      setUploadStatus('업로드 실패.');
    }
  };

  useEffect(() => {
    console.log('업로드 상태>>', uploadStatus);
  }, [uploadStatus]);

  // const handleCallCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   handleFileChange(e); // 파일 선택 핸들러 호출
  //   handleUpload(); // 파일 업로드 핸들러 호출
  // };

  return (
    <>
      <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
        {/* 첫번째 열 */}
        <div className='flex flex-col w-1/4 h-full space-y-4'>
          <div className='border border-green-500 flex justify-between p-3 items-center border-b border-black'>
            <div
              className='border border-red-400 text-2xl text-hanagold'
              style={{ fontFamily: 'noto-bold, sans-serif' }}
            >
              {customerData?.name} 손님
            </div>
            <input
              type='file'
              className='text-xs border border-purple-700 w-15'
              accept='.m-3,audio/mp3'
              onChange={handleFileChange}
            />
            <div className='border border-blue-400'>
              <Button
                onClick={handleUpload}
                disabled={!file}
                className='border border-hanaindigo bg-white text-black hover:bg-hanagold hover:text-white'
              >
                전화
              </Button>
            </div>
          </div>

          {/* 손님 정보 */}
          <div className='h-fit'>
            <CustomerInformation customerData={customerData} />
          </div>

          {/* 상담일지 리스트 */}
          <div className='flex-grow overflow-y-auto'>
            <ConsultationJournalList customerId={customerData?.id || 0} />
          </div>
        </div>

        {/* 두번째 열: STT 자동 작성란 */}
        <div className='flex flex-col w-1/4 h-full'>
          <ConsultationScript
            consultingId={consultingId}
            uploadStatus={uploadStatus}
          />
        </div>

        {/* 세번째 열: 상담일지 작성하기 */}
        <div className='flex flex-col w-1/2 h-full'>
          <MakeJournal customerId={customerData?.id || 0} />
        </div>
      </div>
    </>
  );
}
