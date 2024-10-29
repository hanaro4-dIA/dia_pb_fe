import { Switch } from '@radix-ui/react-switch';
import { useState, useRef } from 'react';
import getOffice from '../lib/getOffice';
import { type TPbProps } from '../lib/types';

export default function PbProfile() {
  const [profile, setProfile] = useState<TPbProps>({
    id: 1,
    businessId: 101,
    name: '안유진',
    tags: ['부동산', '대출', '보험'],
    introduce: '안녕하세요 부동산 투자 전문 PB 안유진입니다.',
    image_url:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    office_id: 1,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [Image, setImage] = useState(profile.image_url);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagChange = (index: number, newTag: string) => {
    setProfile((prev) => {
      const updatedTags = [...(prev.tags || [])];
      updatedTags[index] = newTag;
      return { ...prev, tags: updatedTags };
    });
  };

  function isNullTag(tag: string) {
    return tag.trim() === '';
  }

  const handleAddTag = () => {
    if (profile.tags.some(isNullTag)) {
      alert('새로운 태그를 추가하기 전에 이미 존재하는 태그를 채워주세요');
      return;
    }

    setProfile((prev) => ({
      ...prev,
      tags: [...(prev.tags || []), ''],
    }));
  };

  const handleRemoveTag = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    // 서버전송
    if (profile.tags.some(isNullTag)) {
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
      setImage(reader.result as string);
      setProfile((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  console.log(getOffice(profile.office_id));

  return (
    <div className='flex flex-col w-full h-full bg-white rounded-lg shadow-lg border border-gray-200'>
      <div className='flex items-center justify-between bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg'>
        <div>
          <span>내 프로필</span>
          {isEditing ? (
            <button
              className='text-sm text-green-600 ml-3'
              onClick={handleSubmit}
            >
              저장
            </button>
          ) : (
            <button
              className='text-sm text-red-600 ml-3'
              onClick={() => setIsEditing(!isEditing)}
            >
              EDIT
            </button>
          )}
        </div>

        <button className='text-white text-xs font-bold border border-white rounded px-2 py-1'>
          로그아웃
        </button>
      </div>

      <div className='flex items-center pl-3 pr-3'>
        <input
          type='file'
          style={{ display: 'none' }}
          accept='image/jpg,image/png,image/jpeg'
          name='profile_img'
          onChange={handleImage}
          //disabled={!isEditing}
          ref={fileInput}
        />

        <img
          className='w-28 h-28 rounded-full'
          src={Image}
          alt='프로필 이미지'
          onClick={() => {
            isEditing && fileInput.current?.click();
          }}
        />

        <div className='flex flex-col ml-3 mt-3 w-full justify-between'>
          <div className='flex items-center'>
            <input
              className='bg-white flex items-center w-16 text-xl placeholder-black font-bold'
              type='text'
              name='name'
              value={profile.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder={profile.name}
            />
            <p className='mr-4'>PB</p>
            <Switch
              checked={isWorking}
              onCheckedChange={setIsWorking}
              className={`${
                isWorking ? 'bg-green-500' : 'bg-red-500'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  isWorking ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          <small className='text-hanagold my-1'>
            {getOffice(profile.office_id)}
          </small>

          <div className='flex flex-wrap gap-1'>
            {profile.tags?.map((tag, index) => (
              <div
                key={index}
                className='flex items-center bg-hanaindigo rounded-lg mr-2 h-8 p-1 w-[28%]'
              >
                <p className='text-white text-xs mx-1'>#</p>
                <input
                  className='bg-transparent text-white text-xs w-full'
                  type='text'
                  value={tag}
                  id='tag'
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  disabled={!isEditing}
                  placeholder='입력'
                  maxLength={5}
                />
                {isEditing && (
                  <button
                    className='text-red-600 ml-3 mr-2'
                    type='button'
                    onClick={() => handleRemoveTag(index)}
                  >
                    x
                  </button>
                )}
              </div>
            ))}
            {isEditing && profile.tags?.length < 3 && (
              <button
                className='text-hanaindigo border border-hanaindigo px-2 py-1 rounded-full text-sm'
                type='button'
                onClick={handleAddTag}
              >
                + 태그 추가
              </button>
            )}
          </div>

          {/* 한줄 자기소개 */}
          <textarea
            className='bg-hanaindigo w-auto p-3 mt-2 text-xs text-white resize-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl'
            name='introduce'
            value={profile.introduce}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder={profile.introduce}
          />
        </div>
      </div>
    </div>
  );
}
