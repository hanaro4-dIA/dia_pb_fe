// @ts-ignore
import MicRecorder from 'mic-recorder-to-mp3';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const [isRefetch, setRefetch] = useState(false);
  const [fetchFinished, setFetchFinished] = useState(false); // fetchFinished가 true이면 전화버튼 비활성화
  const [file, setFile] = useState<File | null>(null);
  const [_, setUploadStatus] = useState<string>('');

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
      setUploadStatus('loading...');

      // fetch를 사용하여 파일 업로드
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}journals/${consultingId}/transcripts`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        }
      );

      if (response.ok) {
        setUploadStatus('success!');
        setRefetch(true);
      } else {
        throw new Error(`서버 에러: ${response.status}`);
      }
    } catch (error) {
      console.error('업로드 실패:', error);
      setUploadStatus('failed...');
    }
  };

  const handleCallCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  return (
    <>
      <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
        {/* 첫번째 열 */}
        <div className='flex flex-col w-1/4 h-full space-y-4'>
          <div className='flex justify-between p-3 items-center border-b border-black'>
            <div
              className='text-2xl text-hanagold'
              style={{ fontFamily: 'noto-bold, sans-serif' }}
            >
              {customerData?.name} 손님
            </div>
            <input
              id='input-file'
              type='file'
              className='text-xs border border-purple-700 w-15'
              accept='.m-3,audio/mp3'
              onChange={handleCallCustomer}
              style={{ display: 'none' }}
              disabled={fetchFinished}
            />
            <label
              htmlFor='input-file'
              className={`px-3 py-2 cursor-pointer border border-hanaindigo bg-white text-black rounded'
           
              ${
                fetchFinished
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'border-hanaindigo bg-white text-black hover:bg-hanagold hover:text-white'
              } rounded`}
            >
              전화
            </label>
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
            isRefetch={isRefetch}
            fetchFinished={fetchFinished}
            setFetchFinished={setFetchFinished}
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
