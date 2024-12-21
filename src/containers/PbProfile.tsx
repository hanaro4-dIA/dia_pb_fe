import { Switch } from '@radix-ui/react-switch';
import { useState, useRef, useEffect } from 'react';
import Section from '../components/Section';
import useFetch from '../hooks/useFetch';
import { type TPbDataProps } from '../types/dataTypes';

export default function PbProfile() {
  const { data, error } = useFetch<TPbDataProps>('pb/profile');
  const [pbData, setPbData] = useState<TPbDataProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data) {
      setPbData(data);
      setIsAvailable(data.availability);
    }
  }, [data]);

  useEffect(() => {
    if (pbData) {
      localStorage.setItem('loginPB', JSON.stringify(pbData));
    }
  }, [pbData]);

  if (error) {
    console.error('PB 프로필 조회 중 발생한 에러: ', error);
  }

  if (!pbData) {
    return <div>프로필 데이터를 불러오는 중입니다...</div>;
  }

  const handleAvailabilityChange = (checked: boolean) => {
    setIsAvailable(checked);
    setPbData((prev) => (prev ? { ...prev, availability: checked } : null));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPbData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleTagChange = (index: number, newTag: string) => {
    setPbData((prev) => {
      if (!prev) return null;
      const updatedTags = [...(prev.hashtagList || [])];
      updatedTags[index] = newTag;
      return { ...prev, hashtagList: updatedTags };
    });
  };

  const handleAddTag = () => {
    if (pbData?.hashtagList.some((tag) => tag.trim() === '')) {
      alert('새로운 태그를 추가하기 전에 이미 존재하는 태그를 채워주세요');
      return;
    }
    setPbData((prev) =>
      prev ? { ...prev, hashtagList: [...prev.hashtagList, ''] } : null
    );
  };

  const handleRemoveTag = (index: number) => {
    setPbData((prev) =>
      prev
        ? {
            ...prev,
            hashtagList: prev.hashtagList.filter((_, i) => i !== index),
          }
        : null
    );
  };

  const handleTagSubmit = () => {
    if (pbData?.hashtagList.some((tag) => tag.trim() === '')) {
      alert('tag가 비어있습니다!');
      return;
    }
    setIsEditing(false);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      setPbData((prev) => (prev ? { ...prev, imageUrl } : null));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Section
      title='내 프로필'
      pbProfile={true}
      layoutClassName='h-full'
      contentClassName='w-full h-full flex items-center justify-center px-3'
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      handleSubmit={handleTagSubmit}
      arrowToggle={true}
    >
      <div className='w-full py-14 flex justify-between items-center'>
        <input
          type='file'
          style={{ display: 'none' }}
          accept='image/jpg,image/png,image/jpeg'
          name='profile_img'
          onChange={handleImage}
          ref={fileInput}
        />
        <div className='w-24 h-24 aspect-square relative'>
          <img
            className={`w-full h-full rounded-full ${isEditing && 'cursor-pointer'}`}
            src={pbData.imageUrl}
            alt='프로필 이미지'
            onClick={() => isEditing && fileInput.current?.click()}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        <div className='flex flex-col ml-3 mt-3 w-full justify-between'>
          <div className='flex items-center'>
            <div
              className='flex items-center w-16 text-xl'
              style={{ fontFamily: 'noto-bold, sans-serif' }}
            >
              {pbData.name}
            </div>
            <p className='mr-4'>PB</p>

            <Switch
              checked={isAvailable}
              onCheckedChange={handleAvailabilityChange}
              className={`${isAvailable ? 'bg-green-500' : 'bg-red-500'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${isAvailable ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          <small className='text-hanagold my-1'>{pbData.office}</small>

          <div className='flex flex-row flex-wrap gap-1 items-center'>
            {pbData.hashtagList?.map((tag, index) => (
              <div
                key={index}
                className='flex items-center bg-hanaindigo rounded-lg w-fit h-8 p-1 px-2'
              >
                <p className='text-white text-xs mr-1 flex items-center'>#</p>
                {isEditing ? (
                  <input
                    className='bg-transparent text-white text-xs w-14'
                    type='text'
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    placeholder='최대5글자'
                    maxLength={5}
                  />
                ) : (
                  <span className='text-white text-xs'>{tag}</span>
                )}

                {isEditing && (
                  <button
                    className='text-red-600 ml-1'
                    type='button'
                    onClick={() => handleRemoveTag(index)}
                  >
                    x
                  </button>
                )}
              </div>
            ))}
            {isEditing && pbData.hashtagList.length < 3 && (
              <button
                className='text-hanaindigo border border-hanaindigo px-2 py-1 rounded-full text-sm'
                type='button'
                onClick={handleAddTag}
              >
                + 태그 추가
              </button>
            )}
          </div>

          {isEditing ? (
            <textarea
              className='p-1 my-2 text-xs text-hanaindigo resize-none outline-none border-2 focus:border-hanaindigo'
              name='introduce'
              value={pbData.introduce || ''}
              onChange={handleInputChange}
              placeholder={pbData.introduce || '자기소개를 입력해주세요'}
              maxLength={50}
            />
          ) : (
            <div className='text-xs text-black my-2'>{pbData.introduce}</div>
          )}
        </div>
      </div>
    </Section>
  );
}
