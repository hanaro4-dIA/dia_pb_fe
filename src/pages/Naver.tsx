import React, { useState } from 'react';

function Naver() {
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
        `${import.meta.env.VITE_API_KEY}journals/1/transcripts`,
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

  return (
    <div>
      <h2>.mp3 파일 업로드</h2>
      <input type='file' accept='.m-3,audio/mp3' onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        파일 업로드
      </button>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default Naver;
